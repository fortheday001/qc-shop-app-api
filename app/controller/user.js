'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
const moment = require('moment');
const jwt = require('jsonwebtoken');

class UserController extends Controller {

  async login() {
    const user = await this.app.mysql.get('qc_users', { mobile: this.ctx.request.body.mobile });
    if (user) {
      if (user.password === md5(this.ctx.request.body.password + this.app.config.keys)) {
        const token = jwt.sign({ id: user.id }, this.app.config.keys, {
          expiresIn: '2h',
        });
        this.ctx.body = {
          ok: 1,
          data: {
            token,
          },
        };
      } else {
        this.ctx.body = {
          ok: 0,
          error: '密码不正确',
        };
      }
    } else {
      this.ctx.body = {
        ok: 0,
        error: '账号不存在',
      };
    }
  }

  async regist() {
    const data = this.ctx.request.body;
    const ret = await this.app.mysql.insert('qc_users', {
      mobile: data.mobile,
      source: data.source,
      password: md5(data.password + this.app.config.keys),
      regtime: moment().unix(),
    });
    this.ctx.body = {
      ok: 1,
      data: {
        ret,
      },
    };
  }

  async bind_mobile() {
    const openid = await this.app.redis.get('wxlogin:' + this.ctx.request.body.bindkey);
    if (openid) {
      await this.app.mysql.update('qc_users', {
        id: this.ctx.state.user.id,
        wx_open_id: openid,
      });
      await this.app.redis.del('wxlogin:' + this.ctx.request.body.bindkey);
      this.ctx.body = {
        ok: 1,
      };
    } else {
      this.ctx.body = {
        ok: 0,
        error: 'bindkey 无效',
      };
    }
  }

  async wxlogin() {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.app.config.wx.appid}&secret=${this.app.config.wx.secret}&js_code=${this.ctx.request.body.code}&grant_type=authorization_code`;
    const result = await this.app.curl(url, {
      dataType: 'json',
    });
    if (result.data.errcode) {
      this.ctx.body = {
        ok: 0,
        error: result.data.errmsg,
      };
    } else {
      const user = await this.app.mysql.get('qc_users', { wx_open_id: result.data.openid });
      if (user) {
        const token = jwt.sign({ id: user.id }, this.app.config.keys, {
          expiresIn: '2h',
        });
        this.ctx.body = {
          ok: 1,
          data: {
            token,
          },
        };
      } else {
        const bindkey = md5(result.data.openid + this.app.config.keys);
        await this.app.redis.set('wxlogin:' + bindkey, result.data.openid, 'EX', 1200);
        this.ctx.body = {
          ok: 2,
          data: {
            bindkey,
          },
        };
      }
    }
  }

}

module.exports = UserController;

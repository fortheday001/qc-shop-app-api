'use strict';

const Controller = require('egg').Controller;

class CartController extends Controller {

  async add() {
    const goods = await this.app.mysql.get('qc_carts', {
      user_id: this.ctx.state.user.id,
      sku_id: this.ctx.request.body.sku_id,
    });
    if (goods) {
      await this.app.mysql.update('qc_carts', {
        count: parseInt(this.ctx.request.body.count) + parseInt(goods.count),
      }, {
        where: {
          goods_id: this.ctx.request.body.goods_id,
          user_id: this.ctx.state.user.id,
          sku_id: this.ctx.request.body.sku_id,
        },
      });
    } else {
      await this.app.mysql.insert('qc_carts', {
        user_id: this.ctx.state.user.id,
        sku_id: this.ctx.request.body.sku_id,
        goods_id: this.ctx.request.body.goods_id,
        count: this.ctx.request.body.count,
      });
    }
    this.ctx.body = {
      ok: 1,
    };
  }

  async update() {
    await this.app.mysql.update('qc_carts', this.ctx.request.body, {
      where: {
        user_id: this.ctx.state.user.id,
        sku_id: this.ctx.params.sku_id,
      },
    });
    this.ctx.body = {
      ok: 1,
    };
  }

  async clear() {
    this.ctx.service.cart.clear();
    this.ctx.body = {
      ok: 1,
    };
  }

  async delete() {
    const sku_id = this.ctx.params.sku_id.split(',');
    await this.app.mysql.delete('qc_carts', {
      user_id: this.ctx.state.user.id,
      sku_id,
    });
    this.ctx.body = {
      ok: 1,
    };
  }

  async index() {
    const sql = `SELECT a.goods_id,a.sku_id,a.count,a.is_chk,b.goods_name,b.image,c.price,c.spec_list
                FROM qc_carts a
                 LEFT JOIN qc_goods b ON a.goods_id=b.id
                 LEFT JOIN qc_goods_skus c ON a.sku_id=c.id
                 WHERE a.user_id=?`;
    const data = await this.app.mysql.query(sql, this.ctx.state.user.id);
    this.ctx.body = {
      ok: 1,
      data,
    };
  }

}

module.exports = CartController;

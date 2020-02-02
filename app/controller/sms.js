'use strict';

const Controller = require('egg').Controller;

class SmsController extends Controller {

  async send() {
    this.ctx.body = {
      ok: 1,
      data: {
        code: '329933',
      },
    };
  }

}

module.exports = SmsController;

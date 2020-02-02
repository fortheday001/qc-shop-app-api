'use strict';

const Service = require('egg').Service;

class CartService extends Service {

  async clear() {
    await this.app.mysql.delete('qc_carts', {
      user_id: this.ctx.state.user.id,
    });
  }
}

module.exports = CartService;

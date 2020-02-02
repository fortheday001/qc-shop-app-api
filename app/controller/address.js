'use strict';

const Controller = require('egg').Controller;

class AddressController extends Controller {

  async add() {
    const data = this.ctx.request.body;
    data.user_id = this.ctx.state.user.id;
    await this.app.mysql.insert('qc_user_addresses', data);
    this.ctx.body = {
      ok: 1,
    };
  }

  async delete() {
    await this.app.mysql.delete('qc_user_addresses', { id: this.ctx.params.id });
    this.ctx.body = {
      ok: 1,
    };
  }

  async default() {
    const data = await this.app.mysql.select('qc_user_addresses', {
      columns: [ 'name', 'address', 'mobile', 'zipcode', 'province_id', 'city_id', 'area_id' ],
      where: {
        isdefault: 1,
        user_id: this.ctx.state.user.id,
      },
    });
    this.ctx.body = {
      ok: 1,
      data: data[0],
    };
  }

  async index() {
    const data = await this.app.mysql.select('qc_user_addresses', {
      columns: [ 'name', 'address', 'mobile', 'zipcode', 'province_id', 'city_id', 'area_id' ],
      where: {
        isdefault: 1,
      },
    });
    this.ctx.body = {
      ok: 1,
      data,
    };
  }

}

module.exports = AddressController;

'use strict';

const Service = require('egg').Service;

class OrderService extends Service {

  table = 'qc_orders'

  async findAll() {
    let page = this.ctx.query.page || 1
    let limit = this.ctx.query.pagesize || 10
    let status = this.ctx.query.status || ''

    // where
    let where = { user_id: this.ctx.state.user.id  }
    if(status) {
      where.status=status
    }

    // 翻页
    let offset = (page-1)*limit

    const count = await this.app.mysql.count(this.table, where);

    const data = await this.app.mysql.select(this.table, {
      columns: [ 'id', 'order_sn', 'addtime', 'status', 'total_price', 'shr_address', 'shr_name', 'shr_mobile' ],
      where,
      limit,
      offset
    });

    return {
      count,
      data,
    };
  }

}

module.exports = OrderService;

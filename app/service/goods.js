'use strict';

const Service = require('egg').Service;

class GoodsService extends Service {

  table = 'qc_goods'

  async findAll() {
    let page = this.ctx.query.page || 1
    let limit = this.ctx.query.pagesize || 10
    let cat1_id = this.ctx.query.cat1_id || ''
    let cat2_id = this.ctx.query.cat2_id || ''
    let cat3_id = this.ctx.query.cat3_id || ''
    let brand_id = this.ctx.query.brand_id || ''

    // where
    let where = { 
      is_on: 1,
      is_chk: 1,
      is_deleted: 0
     }
    if(cat1_id) {
      where.cat1_id=cat1_id
    }
    if(cat2_id) {
      where.cat2_id=cat2_id
    }
    if(cat3_id) {
      where.cat3_id=cat3_id
    }
    if(brand_id) {
      where.brand_id=brand_id
    }

    // 翻页
    let offset = (page-1)*limit

    const count = await this.app.mysql.count(this.table, where);

    const data = await this.app.mysql.select(this.table, {
      columns: ['id','goods_sn','image','goods_name','is_on','is_chk'],
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

module.exports = GoodsService;

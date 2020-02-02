'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {

  async search() {
    this.ctx.body = {
      ok: 1,
      data: await this.ctx.service.goods.findAll(),
    };
    // this.ctx.body = {
    //   ok: 1,
    //   total: 324,
    //   data: [
    //     {
    //       id: 1,
    //       goods_name: '小米（MI）米家压力电锯煲，压力时电环加热小米智能笔记本电脑',
    //       goods_image: 'http://www.wuyinglei.com:61005/shopapp/goods/index-ph01.png',
    //       price: 1199.00,
    //     },
    //     {
    //       id: 2,
    //       goods_name: '小米（MI）米家压力电锯煲，压力时电环加热小米智能笔记本电脑',
    //       goods_image: 'http://www.wuyinglei.com:61005/shopapp/goods/index-ph02.png',
    //       price: 1199.00,
    //     },
    //     {
    //       id: 3,
    //       goods_name: '小米（MI）米家压力电锯煲，压力时电环加热小米智能笔记本电脑',
    //       goods_image: 'http://www.wuyinglei.com:61005/shopapp/goods/index-ph03.png',
    //       price: 1199.00,
    //     },
    //     {
    //       id: 4,
    //       goods_name: '小米（MI）米家压力电锯煲，压力时电环加热小米智能笔记本电脑',
    //       goods_image: 'http://www.wuyinglei.com:61005/shopapp/goods/index-ph04.png',
    //       price: 1199.00,
    //     },
    //     {
    //       id: 5,
    //       goods_name: '小米（MI）米家压力电锯煲，压力时电环加热小米智能笔记本电脑',
    //       goods_image: 'http://www.wuyinglei.com:61005/shopapp/goods/index-ph05.png',
    //       price: 1199.00,
    //     },
    //   ],
    // };
  }

  async detail() {
    let sql;
    const images = await this.app.mysql.query('SELECT image FROM qc_goods_images WHERE goods_id = ?', this.ctx.params.id);

    sql = `SELECT a.goods_name,a.app_detail,b.price,b.spec_list,b.image
            FROM qc_goods a
             LEFT JOIN qc_goods_skus b ON (a.id=b.goods_id AND b.is_default=1)
              WHERE a.id=?`;
    const goods = await this.app.mysql.query(sql, this.ctx.params.id);

    sql = `SELECT a.spec_id,b.spec_name,a.spec_value 
                  FROM qc_goods_specs a
                   LEFT JOIN qc_specs b ON a.spec_id=b.id
                    WHERE a.goods_id = ?`;
    const specs = await this.app.mysql.query(sql, this.ctx.params.id);

    sql = `SELECT a.arg_id,b.arg_name,a.arg_value 
                  FROM qc_goods_args a
                   LEFT JOIN qc_args b ON a.arg_id=b.id
                    WHERE a.goods_id = ?`;
    const args = await this.app.mysql.query(sql, this.ctx.params.id);

    this.ctx.body = {
      ok: 1,
      data: {
        goods,
        images,
        specs,
        args,
      },
    };
  }

}

module.exports = GoodsController;

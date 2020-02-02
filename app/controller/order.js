'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');

class OrderController extends Controller {

  async add() {

    const user_id = this.ctx.state.user.id;

    const address = await this.app.mysql.get('qc_user_addresses', { id: this.ctx.request.body.address_id });
    if (address) {

      const sql = `SELECT a.count,a.goods_id,a.is_chk,a.sku_id,b.price,b.stock
                    FROM qc_carts a
                    LEFT JOIN qc_goods_skus b ON a.sku_id=b.id
                    WHERE a.user_id=?`;
      const carts = await this.app.mysql.query(sql, this.ctx.state.user.id);

      const orderGoods = [];

      let goods_price = 0;
      for (let i = 0; i < carts.length; i++) {
        if (carts[i].is_chk === 0) continue;
        if (carts[i].stock < carts[i].count) {
          this.ctx.body = {
            ok: 0,
            error: '库存量不足',
          };
          return;
        }
        goods_price += parseFloat(carts[i].price);
        orderGoods.push({
          sku_id: carts[i].sku_id,
          goods_id: carts[i].goods_id,
          count: carts[i].count,
          price: carts[i].price,
        });
      }

      const postage = 0;

      // 下单
      const conn = await this.app.mysql.beginTransaction();
      try {
        const order_sn = moment().unix();
        const orderData = {
          user_id,
          addtime: moment().unix(),
          shr_name: address.name,
          shr_mobile: address.mobile,
          shr_zipcode: address.zipcode,
          shr_province: address.province_id,
          shr_city: address.city_id,
          shr_area: address.area_id,
          shr_address: address.address,
          goods_price,
          postage,
          total_price: goods_price + postage,
          status: 0,
          pay_method_id: 1,
          invoice_type: 0,
          post_method_id: 1,
          order_sn,
        };
        const ret = await this.app.mysql.insert('qc_orders', orderData);
        if (ret.insertId) {
          const decStockSql = 'UPDATE qc_goods_skus SET stock=stock-? WHERE id=?';
          orderGoods.forEach(async v => {
            v.order_id = ret.insertId;
            await this.app.mysql.query(decStockSql, [ v.count, v.sku_id ]);
          });
          await this.app.mysql.insert('qc_order_goods', orderGoods);
          await conn.commit(); // 提交事务
          this.ctx.service.cart.clear();
          this.ctx.body = {
            ok: 1,
            data: {
              sn: order_sn,
            },
          };
        } else {
          await conn.rollback();
          this.ctx.body = {
            ok: 0,
            error: '下单失败！',
          };
        }
      } catch (err) {
        await conn.rollback();
        this.ctx.body = {
          ok: 0,
          error: '下单失败！',
        };
      }
    } else {
      this.ctx.body = {
        ok: 0,
        error: '收货地址无效',
      };
    }
  }

  async myorders() {
    this.ctx.body = {
      ok: 1,
      data: await this.ctx.service.order.findAll(),
    };
  }

}

module.exports = OrderController;

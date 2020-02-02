'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 首页
  router.get('/index_swipers', controller.index.indexSiwpers);
  router.get('/index_rec_categories', controller.index.indexRecCategories);
  router.get('/index_floors', controller.index.indexFloors);

  // 分类页
  router.get('/categories', controller.category.categories);

  // 购物车
  router.get('/carts', app.middleware.token(app), controller.cart.index);
  router.post('/carts', app.middleware.token(app), controller.cart.add);
  router.delete('/carts/clear', app.middleware.token(app), controller.cart.clear);
  router.delete('/carts/:sku_id', app.middleware.token(app), controller.cart.delete);
  router.put('/carts/:sku_id', app.middleware.token(app), controller.cart.update);

  // 商品
  router.get('/goods', controller.goods.search);
  router.get('/goods/:id', controller.goods.detail);

  // 会员
  router.get('/userinfo', app.middleware.token(app), controller.user.userinfo);
  router.post('/login', controller.user.login);
  router.post('/regist', controller.user.regist);
  router.post('/wx_login', controller.user.wxlogin);
  router.post('/bind_mobile', app.middleware.token(app), controller.user.bind_mobile);

  // 发送短信验证码
  router.post('/sms', controller.sms.send);

  // 评论
  router.get('/goods/:id/comments', controller.comment.index);
  router.post('/goods/:id/comments', app.middleware.token(app), controller.comment.add);

  // 收货地址
  router.post('/addresses', app.middleware.token(app), controller.address.add);
  router.delete('/addresses/:id', app.middleware.token(app), controller.address.delete);
  router.get('/addresses', app.middleware.token(app), controller.address.index);
  router.get('/default_address', app.middleware.token(app), controller.address.default);

  // 订单
  router.get('/orders', app.middleware.token(app), controller.order.myorders);
  router.post('/orders', app.middleware.token(app), controller.order.add);
};

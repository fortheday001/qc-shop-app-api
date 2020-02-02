'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {

  async indexSiwpers() {
    this.ctx.body = {
      ok: 1,
      data: [
        {
          image: 'http://www.wuyinglei.com:61005/shopapp/swiper/banner1.png',
          url: '/pages/goods/goods?id=12',
        }, {
          image: 'http://www.wuyinglei.com:61005/shopapp/swiper/banner2.png',
          url: '/pages/goods/goods?id=12',
        }, {
          image: 'http://www.wuyinglei.com:61005/shopapp/swiper/banner3.png',
          url: '/pages/goods/goods?id=12',
        }, {
          image: 'http://www.wuyinglei.com:61005/shopapp/swiper/banner4.png',
          url: '/pages/goods/goods?id=12',
        }, {
          image: 'http://www.wuyinglei.com:61005/shopapp/swiper/banner5.png',
          url: '/pages/goods/goods?id=12',
        },
      ],
    };
  }

  async indexRecCategories() {
    this.ctx.body = {
      ok: 1,
      data: [
        {
          id: 1,
          cat_name: '母婴',
          cat_icon: 'http://www.wuyinglei.com:61005/shopapp/classify/classify01.png',
        },
        {
          id: 2,
          cat_name: '女装',
          cat_icon: 'http://www.wuyinglei.com:61005/shopapp/classify/classify02.png',
        },
        {
          id: 3,
          cat_name: '男装',
          cat_icon: 'http://www.wuyinglei.com:61005/shopapp/classify/classify03.png',
        },
        {
          id: 4,
          cat_name: '内衣',
          cat_icon: 'http://www.wuyinglei.com:61005/shopapp/classify/classify04.png',
        },
        {
          id: 5,
          cat_name: '化妆用品',
          cat_icon: 'http://www.wuyinglei.com:61005/shopapp/classify/classify05.png',
        },
        {
          id: 6,
          cat_name: 'XXX',
          cat_icon: 'http://www.wuyinglei.com:61005/shopapp/classify/classify06.png',
        },
        {
          id: 7,
          cat_name: 'YYY',
          cat_icon: 'http://www.wuyinglei.com:61005/shopapp/classify/classify07.png',
        },
        {
          id: 8,
          cat_name: 'xxx',
          cat_icon: 'http://www.wuyinglei.com:61005/shopapp/classify/classify08.png',
        },
      ],
    };
  }

  async indexFloors() {
    this.ctx.body = {
      ok: 1,
      data: [
        {
          id: 1,
          floor_icon: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor01_title@2x.png',
          cate_left: [
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor01_1@2x.png',
              url: '/pages/goods/goods?id=32',
            },
          ],
          cate_mid: [
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor01_2@2x.png',
              url: '/pages/goods/goods?id=32',
            },
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor01_3@2x.png',
              url: '/pages/goods/goods?id=32',
            },
          ],
          cate_right: [
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor01_4@2x.png',
              url: '/pages/goods/goods?id=32',
            },
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor01_5@2x.png',
              url: '/pages/goods/goods?id=32',
            },
          ],
        },
        {
          id: 2,
          floor_icon: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor02_title@2x.png',
          cate_left: [
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor02_1@2x.png',
              url: '/pages/goods/goods?id=32',
            },
          ],
          cate_mid: [
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor02_2@2x.png',
              url: '/pages/goods/goods?id=32',
            },
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor02_3@2x.png',
              url: '/pages/goods/goods?id=32',
            },
          ],
          cate_right: [
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor02_4@2x.png',
              url: '/pages/goods/goods?id=32',
            },
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor02_5@2x.png',
              url: '/pages/goods/goods?id=32',
            },
          ],
        },
        {
          id: 3,
          floor_icon: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor03_title@2x.png',
          cate_left: [
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor03_1@2x.png',
              url: '/pages/goods/goods?id=32',
            },
          ],
          cate_mid: [
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor03_2@2x.png',
              url: '/pages/goods/goods?id=32',
            },
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor03_3@2x.png',
              url: '/pages/goods/goods?id=32',
            },
          ],
          cate_right: [
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor03_4@2x.png',
              url: '/pages/goods/goods?id=32',
            },
            {
              image: 'http://www.wuyinglei.com:61005/shopapp/floor/pic_floor03_5@2x.png',
              url: '/pages/goods/goods?id=32',
            },
          ],
        },
      ],
    };
  }

}

module.exports = IndexController;

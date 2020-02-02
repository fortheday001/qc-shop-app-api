'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {

  async categories() {
    this.ctx.body = {
      ok: 1,
      data: [
        {
          id: 1,
          cat_name: '大家电',
          ad_image: 'http://www.wuyinglei.com:61005/shopapp/classify/category_banner@2x.png',
          ad_link: '/pages/goods/goods?id=435',
          children: [
            {
              id: 32,
              cat_name: '电视',
              children: [
                {
                  id: 54,
                  cat_name: '华为',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/huawei.jpg',
                },
                {
                  id: 55,
                  cat_name: '苹果',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/apple.jpg',
                },
                {
                  id: 56,
                  cat_name: '联想',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/lenovo.jpg',
                },
                {
                  id: 57,
                  cat_name: '小米',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/mi.jpg',
                },
                {
                  id: 58,
                  cat_name: '戴尔',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/dell.jpg',
                },
                {
                  id: 59,
                  cat_name: '华为',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/huawei.jpg',
                },
              ],
            },
            {
              id: 33,
              cat_name: '冰箱',
              children: [
                {
                  id: 54,
                  cat_name: '华为',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/huawei.jpg',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          cat_name: '电脑办公',
          ad_image: 'http://www.wuyinglei.com:61005/shopapp/classify/category_banner@2x.png',
          ad_link: '/pages/goods/goods?id=435',
          children: [
            {
              id: 32,
              cat_name: '电视',
              children: [
                {
                  id: 54,
                  cat_name: '华为',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/apple.jpg',
                },
              ],
            },
          ],
        },
        {
          id: 3,
          cat_name: '食品酒水',
          ad_image: 'http://www.wuyinglei.com:61005/shopapp/classify/category_banner@2x.png',
          ad_link: '/pages/goods/goods?id=435',
          children: [
            {
              id: 32,
              cat_name: '白酒',
              children: [
                {
                  id: 32,
                  cat_name: '江小白',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/apple.jpg',
                },
                {
                  id: 656,
                  cat_name: '茅台',
                  cat_image: 'http://www.wuyinglei.com:61005/shopapp/brands/apple.jpg',
                },
              ],
            },
          ],
        },
      ],
    };
  }

}

module.exports = CategoryController;

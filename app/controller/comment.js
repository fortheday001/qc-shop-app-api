'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {

  async add() {
    this.ctx.body = {
      ok: 1,
    };
  }

  async index() {
    this.ctx.body = {
      ok: 1,
      data: [
        {
          id: 1,
          star: 4,
          name: '猫小喵',
          avatar: 'http://www/www/www/www/www.jpg',
          content: '还可以吧，很好看，质量还不错，就是快递大叔实在太慢了',
          addtime: '2015.11.15',
          images: [
            'http://www/www/www/www/www.jpg',
            'http://www/www/www/www/www.jpg',
            'http://www/www/www/www/www.jpg',
          ],
        },
        {
          id: 2,
          star: 4,
          name: '猫小喵',
          avatar: 'http://www/www/www/www/www.jpg',
          content: '还可以吧，很好看，质量还不错，就是快递大叔实在太慢了',
          addtime: '2015.11.15',
          images: [
            'http://www/www/www/www/www.jpg',
            'http://www/www/www/www/www.jpg',
            'http://www/www/www/www/www.jpg',
          ],
        },
      ],
    };
  }

}

module.exports = CommentController;

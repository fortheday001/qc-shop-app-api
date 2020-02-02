'use strict';

const JWT = require('jsonwebtoken');

module.exports = app => {
  return async function(ctx, next) {
    // 拿到传会数据的header 中的token值
    let token = ctx.request.header.authorization;
    let decode;
    try {
      token = token.replace('Bearer ', '');
      // 验证当前token
      decode = JWT.verify(token, app.config.keys);
      if (Date.now() / 1000 > decode.exp) {
        ctx.body = {
          ok: 0,
          error: '令牌过期',
        };
      } else {
        const user = await app.mysql.get('qc_users', { id: decode.id });
        if (user) {
          ctx.state.user = {
            id: user.id,
          };
          await next();
        } else {
          ctx.body = {
            ok: 0,
            error: '令牌无效',
          };
        }
      }
    } catch (e) {
      console.log(e);
      ctx.body = {
        ok: 0,
        error: '令牌无效',
      };
    }
  };
};

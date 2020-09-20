'use strict';
module.exports = async function(ctx, next) {
  try {
    const { userInfo } = await this.cloud.auth().getEndUserInfo();
    const uid = userInfo.uid;
    if (!uid)
      throw new Error('请登录后使用此功能');
    await next();
  } catch (err) {
    ctx.body = {
      code: 40001,
      message: err
    }
  }
}

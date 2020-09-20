'use strict';
const TcbServer = require('tcb-server').Application;
const config = require('./config');
const router = require('./router');
const app = new TcbServer({
  // change config to your real tcb env
  // https://docs.cloudbase.net/api-reference/server/node-sdk/initialization.html#init
  // env: config.env_id,
  // secretId: config.secretId,
  // secretKey: config.secretKey,
  // credentials: { ...config }
});

// 如需本地测试，请配置secretId,secretKey后，使用以下代码
// const event = { path: '/v1/todo/create', data: { label: 'new' } }
// const event = { path: '/v1/todo/delete', data: { _id: 'e656fa635f66f36c00271b132e6179ca' } }
// const event = { path: '/v1/todo/edit', data: { _id: '1b64dd7b5f66f53c00259df84c578ec9', completed: true } }
// const event = { path: '/v1/todo/list', data: { page: 1, size: 10} }
// return app.serve({
//   event,
//   router
// }).then(response => {
//   console.log('response:', response);
// });
exports.main = async (event) => {
  return app.serve({
    event,
    router
  });
};

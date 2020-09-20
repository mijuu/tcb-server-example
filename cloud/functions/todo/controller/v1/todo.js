'use strict';
const BaseContextClass = require('tcb-server').BaseContextClass;

class Todo extends BaseContextClass {
  async create () {
    const { ctx, service } = this;
    try {
      const { label } = ctx.request.body.data;
      const data = await service.v1.todo.create({ label });
      ctx.body = {
        code: 20000,
        data
      };
    } catch(err) {
      console.error(err);
      ctx.body = {
        code: 50000,
        message: err.message
      };
    }
  }

  async delete () {
    const { ctx, service } = this;
    try {
      const { _id } = ctx.request.body.data;
      const data = await service.v1.todo.delete({ _id });
      ctx.body = {
        code: 20000,
        data
      };
    } catch(err) {
      console.error(err);
      ctx.body = {
        code: 50000,
        message: err.message
      };
    }
  }
  

  async edit () {
    const { ctx, service } = this;
    try {
      const { _id, label, completed } = ctx.request.body.data;
      const data = await service.v1.todo.edit({ _id, label, completed });
      ctx.body = {
        code: 20000,
        data
      };
    } catch(err) {
      console.error(err);
      ctx.body = {
        code: 50000,
        message: err.message
      };
    }
  }
  
  async list() {
    const { ctx, service } = this;
    try {
      const { page, size } = ctx.request.body.data;
      const skip = (page - 1) * size || 0;
      const limit = Number(size) || 10;

      const data = await service.v1.todo.list({ skip, limit });
      ctx.body = {
        code: 20000,
        data
      };
    } catch(err) {
      console.error(err);
      ctx.body = {
        code: 50000,
        message: err.message
      };
    }
  }
}

module.exports = Todo;

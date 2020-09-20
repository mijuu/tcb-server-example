'use strict';
const BaseContextClass = require('tcb-server').BaseContextClass;

class Todo extends BaseContextClass {
  constructor (app) {
    super(app);
    this.db = app.cloud.database();
    this.collection = this.db.collection('todos');
  }

  async create (todo) {
    const completed = false;
    const createdAt = this.db.serverDate();

    const result = await this.collection.add({ ...todo, completed, createdAt });
    if (!result.id)
      throw new Error(result.message);

    return result;
  }

  async delete ({ _id }) {
    const result = await this.collection.doc(_id).remove();
    if (!result.deleted)
      throw new Error(result.message);

    return result;
  }

  async edit ({ _id, label, completed }) {
    const result = await this.collection.doc(_id).update({ label, completed });
    if (result.updated === 0)
      throw new Error(result.message || '文档未更新，请检查输入的更新内容');

    return result;
  }

  async list({ skip, limit }) {
    // TODO 如果云数据库支持$facet，能够一次pipe查询两组数据
    const count = await this.collection.count();
    const result = await this.collection.orderBy('createdAt','desc').skip(skip).limit(limit).get();

    return {
      list: result.data,
      total: count.total
    };
  }
}

module.exports = Todo;

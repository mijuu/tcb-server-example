'use strict';
module.exports = app => {
  const { controller, middleware } = app;

  app.router('/v1/todo/create', controller.v1.todo.create);
  app.router('/v1/todo/delete', middleware.auth, controller.v1.todo.delete);
  app.router('/v1/todo/edit', controller.v1.todo.edit);
  app.router('/v1/todo/list', controller.v1.todo.list);
}

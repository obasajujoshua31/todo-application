import bookshelf from "./index";
import User from "./user";
import uuid from "uuid/v4";

const Todo = bookshelf.Model.extend({
  tableName: "todos",
  uuid: true,
  user: function() {
    return this.belongTo(User);
  },
  initialize: function() {
    this.on("creating", function(todo) {
      todo.attributes.completed = false;
      todo.attributes.created_at = new Date();
      todo.attributes.id = uuid();
    });
  }
});

export default Todo;

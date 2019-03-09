import bookshelf from "./index";
import Todo from "./todo";
import Password from "./model";
import uuid from "uuid/v4";

let User = bookshelf.Model.extend({
  tableName: "users",
  uuid: true,
  todos: function() {
    return this.hasMany(Todo);
  },
  initialize: function() {
    this.on("creating", function(user) {
      user.attributes.password = Password.hashPassword(
        user.attributes.password
      );
      user.attributes.created_at = new Date();
      user.attributes.id = uuid();
    });
  },
  isMatch: function(password) {
    return Password.comparePassword(password, this.get("password"));
  }
});

export default User;

import bookshelf from "./index";
import User from "./user";

/**
 * @description This is a Todo Model with table name todos
 * and associated with Table Users
 */
class Todo extends bookshelf.Model {
  /**
   * return the Table Name todos
   */
  get tableName() {
    return "todos";
  }

  /**
   * get time stamps
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * returns the owner of the todo
   * @returns {Object} User
   */
  user() {
    return this.belongsTo(User);
  }
}

export default Todo;

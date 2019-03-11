import Todo from "./todo";
import bookshelf from "./index";

/**
 * @Description This is the User Model with
 * table name users and has association with Todos
 */
class User extends bookshelf.Model {
  /**
   * this returns the name of the table users
   */
  get tableName() {
    return "users";
  }

  /**
   * this enables bookshelf-uuid
   */
  get uuid() {
    return true;
  }

  /**
   * this enables bookshelf-secure-password
   */
  get hasSecurePassword() {
    return true;
  }

  /**
   * get time stamps
   */
  get hasTimestamps() {
    return true;
  }

  /**
   *  This returns the number of todos the user has
   * @returns {Object} todo
   */
  todos() {
    return this.hasMany(Todo);
  }
}
// User.uuid = true;
// User.hasSecurePassword = "password";

export default User;

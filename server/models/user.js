import Bcrypt from "bcryptjs";
import uuid from "uuid/v4";
import Todo from "./todo";
import bookshelf from "./index";
import generateToken from "../helpers/generateToken";

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

  /**
   *
   *
   * @memberof User
   */

  /**
   *@param {String} email
   *@returns {String} token
   * @memberof User
   */
  authorizeUser = () => {
    return generateToken(this.get("id"));
  };

  /**
   * @return {boolean} true/false
   *@param {string} password
   * @memberof User
   */
  verify = password => {
    return Bcrypt.compareSync(password, this.get("password"));
  };

  /**
   *This returns the user with the given email
   * @param {String} email
   * @param {Boolean} verified
   * @return {Object} user
   * @methods findByEmail
   * @memberof User
   */
  static findByEmail(email, verified = false) {
    return this.forge({
      email,
      verified
    }).fetch({ withRelated: "todos" });
  }

  /**
   *
   *
   * @static
   * @returns {Boolean} true|false String Message
   * @memberof User
   */
  verifyUser() {
    if (this.get("verified")) {
      return false;
    }
    this.set("verified", true);
    this.save();
    return true;
  }
}
// User.uuid = true;
// User.hasSecurePassword = "password";

export default User;

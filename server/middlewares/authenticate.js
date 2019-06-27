import JWT from "jsonwebtoken";
import isEmpty from "lodash.isempty";
import BaseController from "../controllers/base";
import { secret } from "../config/db";
import User from "../models/user";

/**
 *
 *
 * @class Auth
 * @extends {BaseController}
 */
class Auth extends BaseController {
  /**
   * @returns {Access} boolean
   * @param {Object} req
   * @param {Object} res
   *@param {Object} next
   * @memberof Auth
   */
  verifyToken = async (req, res, next) => {
    const token = req.header.authorization || req.params.token;
    if (typeof token === "undefined") {
      return super.sendAuthResponse(res, {
        statusCode: 401,
        message: "Token Not found"
      });
    }

    try {
      const userDecoded = JWT.verify(token, secret);
      const user = await User.forge({
        id: userDecoded.userId
      }).fetch();
      
      if (!user) {
        return super.sendAuthResponse(res, {
          statusCode: 404,
          message: "User not found"
        });
      }
      req.user = user;
      req.email = user.get("email");
      next();
    } catch (error) {
      return super.sendErrorMessage(res, error);
    }
  };
}
export default new Auth();

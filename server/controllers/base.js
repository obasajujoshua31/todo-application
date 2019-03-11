import JWT from "jsonwebtoken";
import { secret } from "../config/db";
import queue from "../worker/worker";
/**
 *
 *
 * @class BaseController
 */
class BaseController {
  /**
   *
   *  Description This returns server response with response object
   * and the message, success, and payload as options.
   * @param {Object} res
   * @param {Object} options
   * @returns {Object} server Response
   * @method sendAuthResponse
   * @memberof BaseController
   */
  sendAuthResponse(res, options) {
    let { statusCode, message, success, ...data } = options;
    statusCode = statusCode || 200;
    return res.status(statusCode).json({
      success: success || statusCode < 400,
      message,
      ...data
    });
  }

  /**
   *
   *  Description This returns Error Message with response object
   * and the message, success, and payload as options.
   * @param {Object} res
   * @param {Error} error
   * @returns {Object} server Response
   * @method sendAuthResponse
   * @memberof BaseController
   */
  sendErrorMessage(res, error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }

  /**
   *
   *
   * @param {String} userId
   * @returns {String} token
   * @memberof BaseController
   */
  authorizeUser(userId) {
    return JWT.sign({ userId }, secret);
  }

  /**
   *
   *
   * @param {object} httpRequestOrResponseObj
   * @returns {string} baseUrl
   * @memberof BaseController
   */
  getBaseUrl(httpRequestOrResponseObj) {
    return `${
      httpRequestOrResponseObj.protocol
    }://${httpRequestOrResponseObj.get("host")}/api/v1/auth/register/verify`;
  }

  /**
   *
   * @method sendVerificationEmail
   * @param {string} email
   * @param {string} url
   * @returns {func} sendEmail
   * @memberof BaseController
   */
  sendVerificationEmail(email, url) {
    return queue
      .create("send-verification-email", { email, url })
      .attempts(3)
      .backoff({ delay: 60 * 1000 })
      .save();
  }
}

export default BaseController;

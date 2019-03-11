import Bcrypt from "bcryptjs";
import BaseController from "./base";
import User from "../models/user";
import generateToken from "../helpers/generateToken";

/**
 *
 *
 * @class UserController
 * @extends BaseController
 */
class UserController extends BaseController {
  /**
   *
   *Description  This is responsible for registering users
   * @param {Object} req
   * @param {Object} res
   * @return {Object} res
   * @memberof User
   * @method registerUser
   */
  registerUser = async (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email)
      .then(user => {
        if (!user) {
          return new User({
            email,
            password: Bcrypt.hashSync(password, 10)
          })
            .save()
            .then(savedUser => {
              const token = generateToken(savedUser.id);
              const url = `${super.getBaseUrl(req)}/${token}`;
              super.sendVerificationEmail(email, url);
              return super.sendAuthResponse(res, {
                success: true,
                message:
                  "Check your mail, a verification link has been sent to you! " +
                  "Check your spam if you cannot find it in your inbox",
                statusCode: 200
              });
            });
        }
        return super.sendAuthResponse(res, {
          success: false,
          message: "Email is not Available",
          statusCode: 404
        });
      })
      .catch(error => {
        return super.sendErrorMessage(res, error);
      });
  };

  /**
   * 
   @param {Object} req
   * @param {Object} res
   * @return {Object} res
   * @memberof User
   * @method verifyUser
   */
  verifyUser = async (req, res) => {
    const { user } = req;
    try {
      if (user.verifyUser()) {
        return super.sendAuthResponse(res, {
          message: "Account successfully Verified"
        });
      }
      return super.sendAuthResponse(res, {
        message: "Account has been Verified Already"
      });
    } catch (error) {
      return super.sendErrorMessage(res, error);
    }
  };

  /**
   *@param {Object}req
   *@param {Object}res
   * @memberof UserController
   */
  logInUser = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, true)
      .then(user => {
        if (user.verify(password)) {
          return super.sendAuthResponse(res, {
            message: "User signed in Successfully",
            data: user.authorizeUser()
          });
        }
        return super.sendAuthResponse(res, {
          statusCode: 404,
          message: "Invalid Email or Password"
        });
      })
      .catch(() => {
        return super.sendAuthResponse(res, {
          statusCode: 404,
          message: "Invalid Email or Password"
        });
      });
  };

  /**
   *  @param {object} req
   * @param {object} res
   *@returns {object} res
   * @memberof UserController
   */
  socialAuth = async (req, res) => {
    return super.sendAuthResponse(res, {
      token: req.user
    });
  };
}

export default UserController;

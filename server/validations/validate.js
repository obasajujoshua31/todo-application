import { check, validationResult } from "express-validator/check";

export default [
  check("email")
    .isEmail()
    .withMessage("Email is not Valid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be more than 5 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsArray = [];
      errors.array().map(error => {
        return errorsArray.push(error.msg);
      });
      return res.status(400).json({
        success: false,
        error: errorsArray
      });
    }
    return next();
  }
];

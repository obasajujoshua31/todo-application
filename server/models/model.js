import Bcrypt from "bcryptjs";

class Password {
  static hashPassword(password) {
    const salt = Bcrypt.genSaltSync(10);
    return Bcrypt.hashSync(password, salt);
  }

  static comparePassword(password, dbpassword) {
    return Bcrypt.compareSync(password, dbpassword);
  }
}

export default Password;

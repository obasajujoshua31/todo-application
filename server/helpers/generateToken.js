import JWT from "jsonwebtoken";

const generateToken = userId => {
  return JWT.sign({ userId }, process.env.secret);
};

export default generateToken;

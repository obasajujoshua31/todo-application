import uuid from "uuid/v4";
import JWT from "jsonwebtoken";
import generateToken from "../generateToken";
import { secret } from "../../config/db";
import socialMockUser from "./__mock__";
import getProfile from "../passport";
import User from "../../models/user";

describe("Helpers Test", () => {
  it("should return a token for a given userId", () => {
    const userId = uuid();
    const token = generateToken(userId);
    const decodedId = JWT.verify(token, secret);
    expect(decodedId.userId).toBe(userId);
  });

  it("should save a new user", async () => {
    const done = jest.fn();
    await getProfile(null, null, socialMockUser, done);
    const user = await User.forge({ email: "kenneth@email.com" });
    expect(user).toBeDefined();
  });
});

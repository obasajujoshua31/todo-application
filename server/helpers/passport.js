import isEmpty from "lodash.isempty";
import User from "../models/user";
import generateToken from "./generateToken";

const getProfileFromGoogleApi = (access, token, profile, done) => {
  process.nextTick(async () => {
    try {
      const foundUser = await User.findByEmail(profile.email);
      if (isEmpty(foundUser)) {
        const displayName = profile.displayName.split(" ");
        const newUser = await new User({
          email: profile.email,
          firstName: displayName[0],
          lastName: displayName[1],
          imageURL: profile.photos[0].value
        });
        await newUser.save();
        return done(null, generateToken(newUser.get("id")));
      }
      return done(null, generateToken(foundUser.get("id")));
    } catch (error) {
      return done(error, null);
    }
  });
};

export default getProfileFromGoogleApi;

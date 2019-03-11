import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passportConfig from "../config/passport";
import getProfileFromGoogleApi from "../helpers/passport";

const configurePassport = passport => {
  passport.use(new GoogleStrategy(passportConfig, getProfileFromGoogleApi));
};

export default configurePassport;

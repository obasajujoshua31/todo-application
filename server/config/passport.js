const { CLIENT_SECRET, CLIENT_ID, PORT } = process.env;

export default {
  clientSecret: CLIENT_SECRET,
  clientID: CLIENT_ID,
  callbackURL: `http://localhost:${PORT}/api/v1/auth/google/callback`
};

const User = require("../models/user.model");
const { issueToken} = require("../helpers/user");
const { Op } = require("sequelize");
const passportGoogle = require("passport-google-oauth20");
const config = require("../config/config");
const { ROLE } = require("../constant/role");
const { fetchRole } = require("../service/role");
const GoogleStrategy = passportGoogle.Strategy;

exports.googlePassport = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: `${config.BASE_URL}/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const userInfo = {
            first_name: profile?._json?.given_name,
            last_name: profile?._json?.family_name,
            email: profile?._json?.email,
            googleId: profile?._json?.sub,
            isEmailConfirmed: profile?._json?.email_verified
          }; 
          const [user,created] = await User.findOrCreate({
            where: {
              [Op.or]: [
                { googleId: userInfo.googleId },
                { email: userInfo.email },
              ],
            },
            defaults: userInfo,
          });
          if(created){
            const role = await fetchRole({
              where:{
                name:ROLE.STUDENT
              }
            });
            await user.addRole(role);
          }
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
};

exports.issueGoogleToken = async (req, res, next) => {
  try {
    const access_token = await issueToken(
      { sub: req?.user[0]?.id, email:req?.user[0]?.email},
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: config.ACCESS_TOKEN_EXPIRES}
    );
    return res.redirect(`http://localhost:3000/login?auth=true&
      type=google&access_token=${access_token}`);
  } catch (err) {
    next(err);
  }
};



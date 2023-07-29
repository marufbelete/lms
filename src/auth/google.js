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
            google_id: profile?._json?.sub,
            is_email_confirmed: profile?._json?.email_verified
          }; 
          const [user,created] = await User.findOrCreate({
            where: {
              [Op.or]: [
                { google_id: userInfo.google_id },
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
      { sub: req?.user?.id, email:req?.user?.email},
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: config.ACCESS_TOKEN_EXPIRES}
    );
    return res.redirect(`${config.FE_URL}/auth/google?auth=true&type=google
      &first_name=${req?.user?.first_name}&last_name=${req?.user?.last_name}
      &email=${req?.user?.email}&access_token=${access_token}`);
  } catch (err) {
    next(err);
  }
};



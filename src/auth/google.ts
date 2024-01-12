import { User } from "../models/user.model";
import { Op } from "sequelize";
import passportGoogle from "passport-google-oauth20";
import config from "../config/config";
import { ROLE } from "../constant/role";
import { RoleService} from "../service/index.service";
import { issueToken } from "../helpers/user";
import {Request,Response,NextFunction} from 'express'
const GoogleStrategy = passportGoogle.Strategy;
 

const googleStrategy =new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: `${config.BASE_URL}/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const userInfo = {
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            google_id: profile._json.sub,
            is_email_confirmed: profile._json.email_verified==="true"?true:false
          };
          const [user,created] = await User.findOrCreate({
            where: {
              [Op.or]: [
                { google_id: userInfo.google_id },
              
              ],
            },
            defaults: userInfo,
          });
          if(created){
            const role = await RoleService.fetchRole({
              where:{
                name:ROLE.STUDENT
              }
            });
            await user.$add('role',role);
          }
          done(null, user);
        } catch (err:any) {
          done(err, undefined);
        }
      })

const issueGoogleToken = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const user = req.user as User;
    const access_token = issueToken(
      { sub: user.id, email: user.email! },
      config.ACCESS_TOKEN_SECRET,
      {expiresIn: config.ACCESS_TOKEN_EXPIRES }
    );
    return res
    .cookie("access_token", {
        sameSite: "none",
        path: "/",
        secure: true,
        httpOnly: true,
      })
    .redirect(`${config.FE_URL}/dashboard?auth=true&type=google
      &first_name=${user.first_name}&last_name=${user.last_name}
      &email=${user.email}&access_token=${access_token}`);
  } catch (err) {
    next(err);
  }
};

  
export {
  googleStrategy,
  issueGoogleToken
}

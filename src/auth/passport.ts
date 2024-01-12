import passport from 'passport';
import {UserService} from '../service/index.service';
import {googleStrategy} from './google';


passport.serializeUser(function(user:any, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id:string, done) {
    const user= await UserService.fetchUserById(id)
    return done(null, user);
});


passport.use('google', googleStrategy);
export default passport;
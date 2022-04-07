import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from '../models';

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

// Sign-in validity compared to Database Info -> error, no user, check password
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  return User.findOne({ email }, (error, user) => {
    if (error) return done(error);
    if (!user) return done(null, false, { message: 'Email not associated with a user' });

    return user.comparePassword(password, (err, isMatch) => {
      if (err) {
        done(err);
      } else if (!isMatch) {
        done(null, false, { message: 'Incorrect password' });
      } else {
        done(null, user);
      }
    });
  });
});

passport.use(localLogin);

// validate email and password -> includes user document in req.user
const requireSignin = function (req, res, next) {
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email not included in request' });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: 'Password not included in request' });
  }

  return passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) { return next(err); }

    if (!user) { return res.status(401).json({ message: info.message || 'Error authenticating username and password' }); }

    req.user = user;

    return next();
  })(req, res, next);
};

export default requireSignin;

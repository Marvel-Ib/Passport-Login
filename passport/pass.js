const passport = require("passport");
const User = require("../models/user");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

let GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(async (currentUser) => {
        if (currentUser) {
          console.log("current user is", currentUser);
          done(null, currentUser);
        } else {
          const he = new User({
            name: profile.displayName,
            googleId: profile.id,
          });
          re = await he.save();
          console.log("new user:", re);
          done(null, re);
        }
      });
    }
  )
);

// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

// var User = require("../models/user");
// const config = require("../config/main");

// // Setup work and export for the JWT passport strategy
// module.exports = function(passport) {
//   const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
//     secretOrKey: config.secret
//   };
//   console.log(opts);
//   passport.use(
//     new JwtStrategy(opts, function(jwt_payload, done) {
//       console.log("when", jwt_payload);
//       User.findOne({ _id: jwt_payload._id }, function(err, user) {
//         if (err) {
//           return done(err, false);
//         }
//         if (user) {
//           console.log("here are the user", user);
//           done(null, user);
//         } else {
//           done(null, false);
//         }
//       });
//     })
//   );
// };

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]"
    },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              errors: { "email or password": "is invalid" }
            });
          }
          return done(null, user);
        })
        .catch(null, user);
    }
  )
);

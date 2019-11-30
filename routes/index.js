var express = require("express");
var router = express.Router();

const config = require("../config/main");
var passport = require("passport");
var passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const requireAuth = passport.authenticate("jwt", { session: false });
var svgCaptcha = require("svg-captcha");

var User = require("../models/user");
var rCaptcha = require("../models/regcaptcha");

require("../config/passport")(passport);

// Register new users
router.post("/register", function(req, res) {
  //find regCaptcha
  var captcha = req.body.user_captcha;
  var captcha_id = req.body._id;
  console.log("We are here", captcha);
  var lowerCase = captcha.toLowerCase();
  rCaptcha.findOne({ _id: captcha_id }, function(err, captcha) {
    if (err) {
      throw err;
    } else {
      console.log("Yahoo captcha is", captcha);
      if (
        !req.body.email ||
        !req.body.password ||
        lowerCase != captcha.captcha
      ) {
        if (lowerCase != captcha.captcha) {
          res.json({ success: false, message: "Invalid Captcha" });
        } else {
          res.json({
            success: false,
            message: "Please enter email and password or Invalid Captcha."
          });
        }
      } else {
        User.findOne({ email: req.body.email }, function(err, user) {
          console.log(req.body.email, req.body.password);
          if (user) {
            return res
              .status(400)
              .json({
                success: false,
                message: "That email address already exists."
              });
          } else {
            var crypto = require("crypto"),
              password = req.body.password,
              key = "mysecret key";

            var hash = crypto.createHmac("sha512", key);
            hash.update(password);
            var value = hash.digest("hex");

            const newUser = new User({
              email: req.body.email,
              username: req.body.username,
              pubKey: req.body.pubKey,
              privKey: req.body.privKey,
              password: value,
              earnings: 0,
              first_name: req.body.firstname,
              last_name: req.body.lastname,
              country: req.body.country,
              phone_number: req.body.phone_number
            });

            // Attempt to save the user
            newUser.save(function(err, user) {
              if (err) {
                return res
                  .status(400)
                  .json({
                    success: false,
                    message: "That email address already exists."
                  });
              }
              console.log("Here is the user detail", user);
              res
                .status(201)
                .json({
                  success: true,
                  message: "Successfully created new user."
                });
            });
          }
        });
      }
    }
  });
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post("/authenticate", function(req, res) {
  console.log("authenticate username", req.body);
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res
        .status(401)
        .json({
          success: false,
          message: "Authentication failed. User not found."
        });
    } else {
      // Check if password matches
      var crypto = require("crypto"),
        password = req.body.password,
        key = "mysecret key";

      var hash = crypto.createHmac("sha512", key);
      hash.update(password);
      var value = hash.digest("hex");

      if (value == user.password) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });
        var profile = { username: user.username, userType: user.userType };

        res
          .status(200)
          .json({ success: true, token: "jwt " + token, profile: profile });
      } else {
        res
          .status(401)
          .json({
            success: false,
            message: "Authentication failed. Passwords did not match."
          });
      }
    }
  });
});

router.post("/captcha", function(req, res) {
  var options = {
    size: 6,
    ignoreChars: "0o1ilL8B",
    noise: 1,
    color: false,
    background: "#D5DBDB"
  };
  var captcha = svgCaptcha.create(options);
  var c = captcha.text;
  var lowerCase = c.toLowerCase();
  var regCaptcha = new rCaptcha();

  console.log(regCaptcha.id);
  regCaptcha.captcha = lowerCase;

  regCaptcha.save(function(err) {
    if (err) {
      console.log("Error in creating new user captcha: " + err);
      throw err;
    }
    console.log("New User Captcha registration created");
    //return (null, newJob);
    res.json({ captcha: captcha.data, id: regCaptcha.id });
  });
});

module.exports = router;

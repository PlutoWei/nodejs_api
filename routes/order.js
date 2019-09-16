var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var svgCaptcha = require('svg-captcha');
var stringSimilarity = require('string-similarity');

var User = require('../models/user');
var rCaptcha = require('../models/regcaptcha');


const jwt = require('jsonwebtoken');
const requireAuth = passport.authenticate('jwt', { session: false });

 var Order = require('../models/order');

var crypto = require('crypto');
var fs = require('fs');


module.exports = router;
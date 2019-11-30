const jwt = require("express-jwt");
const secret = require("../config/main");
const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req;

  if (authorization && authorization.split("")[0] === "Token") {
    return authorization.split("")[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: secret.secret,
    userProperty: "payload",
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

module.exports = auth;

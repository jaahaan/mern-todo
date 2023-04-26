const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    // console.log(process.env.JWT_SECRET);
    const a = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(a);
    req.user = a.id;
    // console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

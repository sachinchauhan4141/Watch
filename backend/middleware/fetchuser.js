const jwt = require("jsonwebtoken");

const JWT_SECRET = "4141 Hu Me 4141 1s Duniya ka 4141";

const fetchuser = (req, res, next) => {
  // get user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "invalid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "invalid token" });
  }
};

module.exports = fetchuser;
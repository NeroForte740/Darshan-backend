const jwt = require("jsonwebtoken");
const authCongif = require("../../config/auth");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "token não foi passado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    jwt.verify(token, authCongif.secret);
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalido!" });
  }
};

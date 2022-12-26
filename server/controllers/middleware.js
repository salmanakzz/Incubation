// verify user token middleware

const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers["x-accesss-token"];

    if (!token) {
      res.json({ user: false, admin: false, auth: false , err:"no token"});
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({
            status: "error",
            error: "user authentication failed",
            auth: false,
          });
        } else {
          req.userData = decoded.data;
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyJWT;

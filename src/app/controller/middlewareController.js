const jwt = require("jsonwebtoken");

const middlewareController = {
  //verifyToken
  //check token
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },

 //check token and isAdmin
 verifyTokenAndAdmin :  (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.isAdmin==1) {
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  }
};

module.exports = middlewareController;

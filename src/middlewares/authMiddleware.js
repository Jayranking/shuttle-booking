const jwt = require("jsonwebtoken");

const checkDriver = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token || token === undefined) {
    return res.redirect("/login");
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decodedToken) => {
      if (error) {
        if (error.message === "jwt expired") {
          return res.redirect("/login");
        }
        return res.redirect("/login");
      } else {
        req.driver = decodedToken.id;
        res.locals._driver = req.driver;
        next();
      }
    });
  } else {
    return res.redirect("/login");
  }
};

module.exports = { checkDriver };

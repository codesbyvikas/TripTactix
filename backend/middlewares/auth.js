const { validateToken } = require('../services/auth');

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      next();
    } catch (error) {
      console.log("Invalid token:", error.message);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
}

module.exports = checkForAuthCookie;

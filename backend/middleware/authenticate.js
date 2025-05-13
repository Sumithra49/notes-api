const jwt = require("jsonwebtoken");

const SECRET = "secret123"; // Store securely in production

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.writeHead(401).end("Unauthorized");

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Attach decoded user to request
    next();
  } catch (err) {
    res.writeHead(403).end("Forbidden");
  }
}

module.exports = authenticate;

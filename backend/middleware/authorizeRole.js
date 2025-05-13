function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.writeHead(403).end("Forbidden");
    } else {
      next();
    }
  };
}

module.exports = authorizeRole;

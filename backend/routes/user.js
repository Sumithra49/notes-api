const { registerUser, loginUser } = require("../controllers/userController");

function userRoutes(req, res) {
  if (req.method === "POST" && req.url === "/register") {
    registerUser(req, res); // Handle user registration
  } else if (req.method === "POST" && req.url === "/login") {
    loginUser(req, res); // Handle user login
  } else {
    res.writeHead(404).end("Not Found"); // Handle unsupported routes
  }
}

module.exports = userRoutes;

const http = require("http");
const userRoutes = require("./routes/user"); // Import user routes
const notesHandler = require("./routes/notes");
const authenticate = require("./middleware/authenticate");

const server = http.createServer((req, res) => {
  // Route for user registration
  if (req.url === "/register" && req.method === "POST") {
    userRoutes(req, res);
  }
  // Route for user login
  else if (req.url === "/login" && req.method === "POST") {
    userRoutes(req, res);
  }
  // Route for notes (authenticated routes)
  else if (req.url.startsWith("/notes")) {
    authenticate(req, res, () => {
      notesHandler(req, res); // Handle notes routes
    });
  } else {
    res.writeHead(404).end("Not Found"); // Handle unsupported routes
  }
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});

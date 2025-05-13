const http = require("http");
const authenticate = require("./middleware/authenticate");
const notesHandler = require("./routes/notes");

const server = http.createServer(async (req, res) => {
  // Apply authentication for /notes
  if (req.url.startsWith("/notes")) {
    authenticate(req, res, async () => {
      await notesHandler(req, res);
    });
  } else {
    res.writeHead(404).end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});

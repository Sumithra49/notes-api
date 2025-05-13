const { createNote, getNotes, deleteNoteById } = require("../models/notes");

function notesHandler(req, res) {
  if (req.method === "POST" && req.url === "/notes") {
    // Create a new note
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const { title, content } = JSON.parse(body);
      const newNote = createNote(title, content, req.user.id);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newNote));
    });
  } else if (req.method === "GET" && req.url === "/notes") {
    // Get user's notes (filtered by owner or admin)
    const notes = getNotes(req.user.id, req.user.role);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(notes));
  } else if (req.method === "DELETE" && req.url.startsWith("/notes/")) {
    const id = req.url.split("/")[2];
    const deletedNote = deleteNoteById(id, req.user.id, req.user.role);
    if (!deletedNote) return res.writeHead(403).end("Forbidden");
    res.writeHead(200).end("Note deleted");
  } else {
    res.writeHead(404).end("Not Found");
  }
}

module.exports = notesHandler;

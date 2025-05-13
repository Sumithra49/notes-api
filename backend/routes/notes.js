const { readNotes, writeNotes } = require("../utils/readWriteFile");
const parseBody = require("../utils/parseBody");
const { v4: uuidv4 } = require("uuid");

async function notesHandler(req, res) {
  const notes = readNotes();

  // Create Note
  if (req.method === "POST" && req.url === "/notes") {
    const body = await parseBody(req);
    const newNote = {
      id: uuidv4(),
      title: body.title,
      content: body.content,
      ownerId: req.user.id,
    };
    notes.push(newNote);
    writeNotes(notes);
    res.writeHead(201).end(JSON.stringify(newNote));
  }

  // Get Notes
  else if (req.method === "GET" && req.url === "/notes") {
    const filteredNotes =
      req.user.role === "admin"
        ? notes
        : notes.filter((note) => note.ownerId === req.user.id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(filteredNotes));
  }

  // Delete Note
  else if (req.method === "DELETE" && req.url.startsWith("/notes/")) {
    const id = req.url.split("/")[2];
    const note = notes.find((n) => n.id === id);
    if (!note) return res.writeHead(404).end("Note not found");

    if (note.ownerId !== req.user.id && req.user.role !== "admin") {
      return res.writeHead(403).end("Forbidden");
    }

    const updatedNotes = notes.filter((n) => n.id !== id);
    writeNotes(updatedNotes);
    res.writeHead(200).end("Note deleted");
  } else {
    res.writeHead(404).end("Not Found");
  }
}

module.exports = notesHandler;

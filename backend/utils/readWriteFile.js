const fs = require("fs");
const path = require("path");

const NOTES_FILE = path.join(__dirname, "../data/notes.json");

function readNotes() {
  if (!fs.existsSync(NOTES_FILE)) return [];
  const data = fs.readFileSync(NOTES_FILE);
  return JSON.parse(data);
}

function writeNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

module.exports = { readNotes, writeNotes };

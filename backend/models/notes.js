const { v4: uuidv4 } = require("uuid");

let notes = []; // In-memory storage for notes

// Create a new note
function createNote(title, content, ownerId) {
  const newNote = {
    id: uuidv4(),
    title,
    content,
    ownerId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  notes.push(newNote);
  return newNote;
}

// Get notes by ownerId (user or admin)
function getNotes(ownerId, role) {
  if (role === "admin") {
    return notes; // Admin can see all notes
  }
  return notes.filter((note) => note.ownerId === ownerId); // Users can only see their own notes
}

// Delete a note by ID
function deleteNoteById(id, ownerId, role) {
  const note = notes.find((note) => note.id === id);
  if (!note) return null;

  if (note.ownerId !== ownerId && role !== "admin") {
    return null; // Only the owner or admin can delete the note
  }

  notes = notes.filter((note) => note.id !== id); // Delete note
  return note;
}

module.exports = { createNote, getNotes, deleteNoteById };

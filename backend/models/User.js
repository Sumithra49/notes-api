const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

let users = []; // In-memory storage for users

// Register user
async function createUser(username, password, role = "user") {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
    role,
  };
  users.push(newUser);
  return newUser;
}

// Find user by username
function findUserByUsername(username) {
  return users.find((user) => user.username === username);
}

module.exports = { createUser, findUserByUsername };

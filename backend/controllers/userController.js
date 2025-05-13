// controllers/userController.js
const { createUser, findUserByUsername } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET = "secret123";

// Register new user
async function registerUser(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const { username, password, role } = JSON.parse(body);
      if (!username || !password) {
        return res.writeHead(400).end("Username and password are required");
      }

      // Check if user already exists
      const existingUser = findUserByUsername(username);
      if (existingUser) {
        return res.writeHead(400).end("User already exists");
      }

      // Create new user
      const newUser = await createUser(username, password, role);
      const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET, {
        expiresIn: "1h",
      });

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ token }));
    } catch (error) {
      res.writeHead(400).end("Invalid request body");
    }
  });
}

// Login user and generate JWT
async function loginUser(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const { username, password } = JSON.parse(body);
      if (!username || !password) {
        return res.writeHead(400).end("Username and password are required");
      }

      const user = findUserByUsername(username);
      if (!user) {
        return res.writeHead(404).end("User not found");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.writeHead(403).end("Invalid password");
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
        expiresIn: "1h",
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ token }));
    } catch (error) {
      res.writeHead(400).end("Invalid request body");
    }
  });
}

module.exports = { registerUser, loginUser };

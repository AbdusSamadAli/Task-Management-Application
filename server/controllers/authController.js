import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const [existing] = await db.execute(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email,
      role,
      token: generateToken(result.insertId, role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.execute(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const [users] = await db.execute(
      "SELECT id,name,email,role FROM users"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
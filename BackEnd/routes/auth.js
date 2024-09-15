const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Ruta para registrar usuarios
router.post("/signup", async (req, res) => {
  const { username, email, password_hash, phone_number, age, bank_account } =
    req.body;

  try {
    // Creación de un nuevo usuario
    const user = new User({
      username,
      email,
      password_hash, // Asegúrate de cifrar la contraseña en una implementación real
      phone_number,
      age,
      bank_account,
    });

    // Guardar en la base de datos
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user: " + error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Comparar la contraseña en texto plano
    if (password !== user.password_hash) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Enviar el token y la información del usuario
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Ejemplo de una ruta protegida
router.get("/protected", auth, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.user });
});

// User profile

module.exports = router;

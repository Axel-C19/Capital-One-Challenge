const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth"); // Importamos el middleware
const User = require("../models/User");
const router = express.Router();

// Registro de usuario
router.post("/signup", async (req, res) => {
  const { username, email, password, phone_number, age } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email,
      password_hash,
      phone_number,
      age,
      created_at: new Date(),
    });

    // Guardar usuario en la base de datos
    const savedUser = await newUser.save();

    // Crear un token JWT
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Usuario creado con éxito", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crear un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el inicio de sesión", error });
  }
});

// Ruta protegida: Perfil de usuario
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user es llenado por el middleware
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el perfil del usuario", error });
  }
});

module.exports = router;

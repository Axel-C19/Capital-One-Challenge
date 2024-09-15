const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware para proteger rutas
const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usar el JWT_SECRET de .env
    req.user = decoded.userId; // Asumimos que el token tiene userId
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;

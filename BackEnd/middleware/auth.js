const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token"); // Leer el token del encabezado

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se ha proporcionado un token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    req.user = decoded; // Guardar los datos del usuario decodificados en req.user
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
};

module.exports = auth;

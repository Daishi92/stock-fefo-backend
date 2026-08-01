const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  register,
  login
} = require("../controllers/userController");

// La connexion reste publique (tout le monde doit pouvoir se connecter)
router.post("/login", login);

// L'inscription est réservée UNIQUEMENT à l'Administrateur connecté
router.post("/register", verifyToken, isAdmin, register);

module.exports = router;

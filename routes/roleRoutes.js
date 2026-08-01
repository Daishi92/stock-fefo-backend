const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  createRole,
  getRoles
} = require("../controllers/roleController");

// Créer un rôle (Réservé à l'Admin)
router.post("/", verifyToken, isAdmin, createRole);

// Voir les rôles (Réservé à l'Admin)
router.get("/", verifyToken, isAdmin, getRoles);

module.exports = router;

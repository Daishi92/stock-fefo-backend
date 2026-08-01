const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  createSetting,
  getSettings
} = require("../controllers/settingController");

// Créer ou modifier les paramètres (Réservé exclusivement à l'Admin)
router.post("/", verifyToken, isAdmin, createSetting);

// Voir les paramètres (Accessible aux utilisateurs connectés ou restreint à l'admin selon ton besoin)
router.get("/", verifyToken, getSettings);

module.exports = router;

const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  getAlerts
} = require("../controllers/alertController");

// Voir les alertes FEFO (Réservé exclusivement à l'Admin)
router.get("/", verifyToken, isAdmin, getAlerts);

module.exports = router;

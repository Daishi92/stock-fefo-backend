const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  getReport
} = require("../controllers/reportController");

// Voir les rapports (Réservé exclusivement à l'Administrateur)
router.get("/", verifyToken, isAdmin, getReport);

module.exports = router;

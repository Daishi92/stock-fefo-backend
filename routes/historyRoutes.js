const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  createHistory,
  getHistory,
  deleteHistory
} = require("../controllers/historyController");

// Ajouter une action historique (Accessible utilisateur + admin)
router.post("/", verifyToken, createHistory);

// Voir l'historique (Accessible utilisateur + admin)
router.get("/", verifyToken, getHistory);

// Supprimer une entrée (Réservé exclusivement à l'Admin)
router.delete("/:id", verifyToken, isAdmin, deleteHistory);

module.exports = router;

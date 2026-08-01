const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
  createInventory,
  getInventories,
  validateInventory
} = require("../controllers/inventoryController");

// Créer un inventaire (Accessible utilisateur + admin)
router.post("/", verifyToken, createInventory);

// Liste des inventaires (Accessible utilisateur + admin)
router.get("/", verifyToken, getInventories);

// Valider un inventaire (Réservé à l'Admin)
router.put("/:id/validate", verifyToken, isAdmin, validateInventory);

module.exports = router;

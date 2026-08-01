const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

const {
  stockEntry,
  stockExit
} = require("../controllers/stockController");

// Entrée stock (Accessible utilisateur + admin)
router.post("/entry", verifyToken, stockEntry);

// Sortie FEFO (Accessible utilisateur + admin)
router.post("/exit", verifyToken, stockExit);

module.exports = router;

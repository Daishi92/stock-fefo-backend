const express = require("express");
const router = express.Router();

const {
  createDamage,
  getDamages,
  deleteDamage
} = require("../controllers/damageController");


// Ajouter un produit endommagé
router.post("/", createDamage);

// Liste des produits endommagés
router.get("/", getDamages);

// Supprimer une perte
router.delete("/:id", deleteDamage);


module.exports = router;

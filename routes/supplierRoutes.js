const express = require("express");
const router = express.Router();

const {
  createSupplier,
  getSuppliers,
  deleteSupplier
} = require("../controllers/supplierController");


// Ajouter un fournisseur
router.post("/", createSupplier);

// Voir les fournisseurs
router.get("/", getSuppliers);

// Supprimer un fournisseur
router.delete("/:id", deleteSupplier);


module.exports = router;

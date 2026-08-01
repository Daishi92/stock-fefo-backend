const express = require("express");
const router = express.Router();

const {
  createWarehouse,
  getWarehouses,
  deleteWarehouse
} = require("../controllers/warehouseController");


// Ajouter un entrepôt
router.post("/", createWarehouse);

// Liste des entrepôts
router.get("/", getWarehouses);

// Supprimer un entrepôt
router.delete("/:id", deleteWarehouse);


module.exports = router;

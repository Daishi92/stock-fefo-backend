const express = require("express");
const router = express.Router();

const {
  addLot,
  getLotsFEFO,
  sortieFEFO
} = require("../controllers/lotController");


// Ajouter un lot
router.post("/", addLot);


// Voir les lots en ordre FEFO
router.get("/fefo", getLotsFEFO);


// Sortie automatique FEFO
router.post("/sortie", sortieFEFO);


module.exports = router;

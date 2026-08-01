const express = require("express");
const router = express.Router();

const {
  createLocation,
  getLocations,
  deleteLocation
} = require("../controllers/locationController");


// Ajouter un emplacement
router.post("/", createLocation);

// Voir les emplacements
router.get("/", getLocations);

// Supprimer un emplacement
router.delete("/:id", deleteLocation);


module.exports = router;

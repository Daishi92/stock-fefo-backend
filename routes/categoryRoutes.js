const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  deleteCategory
} = require("../controllers/categoryController");


// Créer une catégorie
router.post("/", createCategory);

// Voir toutes les catégories
router.get("/", getCategories);

// Supprimer une catégorie
router.delete("/:id", deleteCategory);


module.exports = router;

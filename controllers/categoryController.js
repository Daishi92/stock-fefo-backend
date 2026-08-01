const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const Category = require("../models/Category");

const adapter = new JSONFile("./database/db.json");

const db = new Low(adapter, {
  categories: []
});


// Ajouter une catégorie
async function createCategory(req, res) {

  await db.read();

  const category = new Category(req.body);

  db.data.categories.push(category);

  await db.write();

  res.json({
    message: "Catégorie créée",
    category
  });
}


// Liste des catégories
async function getCategories(req, res) {

  await db.read();

  res.json(db.data.categories);
}


// Supprimer une catégorie
async function deleteCategory(req, res) {

  await db.read();

  db.data.categories =
    db.data.categories.filter(
      c => c.id !== req.params.id
    );

  await db.write();

  res.json({
    message: "Catégorie supprimée"
  });
}


module.exports = {
  createCategory,
  getCategories,
  deleteCategory
};

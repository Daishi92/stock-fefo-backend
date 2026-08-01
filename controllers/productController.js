const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const createProduct = require("../models/Product");

const adapter = new JSONFile("./database/db.json");

const db = new Low(adapter, {
  products: []
});


// Ajouter un produit
async function addProduct(req, res) {
  await db.read();

  const product = createProduct(req.body);

  db.data.products.push(product);

  await db.write();

  res.json({
    message: "Produit ajouté",
    product
  });
}


// Voir tous les produits
async function getProducts(req, res) {
  await db.read();

  res.json(db.data.products);
}


// Rechercher un produit
async function searchProduct(req, res) {
  await db.read();

  const { search } = req.query;

  const result = db.data.products.filter(product =>
    product.nom.toLowerCase().includes(search.toLowerCase()) ||
    product.codeBarre === search ||
    product.lot === search
  );

  res.json(result);
}

// Supprimer un produit
async function deleteProduct(req, res) {
  await db.read();

  const idOrBarcode = req.params.id;

  db.data.products =
    db.data.products.filter(product => product.id !== idOrBarcode && product.codeBarre !== idOrBarcode);

  await db.write();

  res.json({
    message: "Produit supprimé"
  });
}



module.exports = {
  addProduct,
  getProducts,
  searchProduct,
  deleteProduct
};

const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const Supplier = require("../models/Supplier");

const adapter = new JSONFile("./database/db.json");

const db = new Low(adapter, {
  suppliers: []
});


// Ajouter un fournisseur
async function createSupplier(req, res) {
  await db.read();

  db.data.suppliers ||= [];

  const supplier = new Supplier(req.body);

  db.data.suppliers.push(supplier);

  await db.write();

  res.json({
    message: "Fournisseur créé",
    supplier
  });
}


// Liste des fournisseurs
async function getSuppliers(req, res) {
  await db.read();

  db.data.suppliers ||= [];

  res.json(db.data.suppliers);
}


// Supprimer un fournisseur
async function deleteSupplier(req, res) {
  await db.read();

  db.data.suppliers =
    db.data.suppliers.filter(
      s => s.id !== req.params.id
    );

  await db.write();

  res.json({
    message: "Fournisseur supprimé"
  });
}


module.exports = {
  createSupplier,
  getSuppliers,
  deleteSupplier
};

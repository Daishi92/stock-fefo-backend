const Warehouse = require("../models/Warehouse");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {
  warehouses: []
});


// Créer un entrepôt
async function createWarehouse(req, res) {
  await db.read();

  db.data.warehouses ||= [];

  const warehouse = new Warehouse(req.body);

  db.data.warehouses.push(warehouse);

  await db.write();

  res.json({
    message: "Entrepôt créé",
    warehouse
  });
}


// Liste des entrepôts
async function getWarehouses(req, res) {
  await db.read();

  db.data.warehouses ||= [];

  res.json(db.data.warehouses);
}


// Supprimer un entrepôt
async function deleteWarehouse(req, res) {
  await db.read();

  db.data.warehouses =
    db.data.warehouses.filter(
      w => w.id !== req.params.id
    );

  await db.write();

  res.json({
    message: "Entrepôt supprimé"
  });
}


module.exports = {
  createWarehouse,
  getWarehouses,
  deleteWarehouse
};

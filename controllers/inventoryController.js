const Inventory = require("../models/Inventory");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {
  inventories: []
});


// Créer un inventaire
async function createInventory(req, res) {
  await db.read();

  db.data.inventories ||= [];

  const inventory = new Inventory(req.body);

  db.data.inventories.push(inventory);

  await db.write();

  res.json({
    message: "Inventaire créé",
    inventory
  });
}


// Liste des inventaires
async function getInventories(req, res) {
  await db.read();

  db.data.inventories ||= [];

  res.json(db.data.inventories);
}


// Valider un inventaire
async function validateInventory(req, res) {
  await db.read();

  const inventory = db.data.inventories.find(
    i => i.id === req.params.id
  );

  if (!inventory) {
    return res.status(404).json({
      message: "Inventaire introuvable"
    });
  }

  inventory.statut = "VALIDE";

  await db.write();

  res.json({
    message: "Inventaire validé",
    inventory
  });
}


module.exports = {
  createInventory,
  getInventories,
  validateInventory
};

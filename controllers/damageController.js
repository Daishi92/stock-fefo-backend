const Damage = require("../models/Damage");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {
  damages: []
});


// Ajouter une perte / produit endommagé
async function createDamage(req, res) {
  await db.read();

  db.data.damages ||= [];

  const damage = new Damage(req.body);

  db.data.damages.push(damage);

  await db.write();

  res.json({
    message: "Produit endommagé enregistré",
    damage
  });
}


// Liste des pertes
async function getDamages(req, res) {
  await db.read();

  db.data.damages ||= [];

  res.json(db.data.damages);
}


// Supprimer une perte
async function deleteDamage(req, res) {
  await db.read();

  db.data.damages =
    db.data.damages.filter(
      d => d.id !== req.params.id
    );

  await db.write();

  res.json({
    message: "Perte supprimée"
  });
}


module.exports = {
  createDamage,
  getDamages,
  deleteDamage
};

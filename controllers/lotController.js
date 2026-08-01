const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const createLot = require("../models/Lot");

const adapter = new JSONFile("./database/db.json");

const db = new Low(adapter, {
  lots: []
});


// Ajouter un lot
async function addLot(req, res) {
  await db.read();

  const lot = createLot(req.body);

  db.data.lots.push(lot);

  await db.write();

  res.json({
    message: "Lot ajouté",
    lot
  });
}


// Voir les lots classés FEFO
async function getLotsFEFO(req, res) {
  await db.read();

  const lots = db.data.lots
    .filter(lot => lot.statut === "ACTIF")
    .sort((a, b) =>
      new Date(a.dateExpiration) -
      new Date(b.dateExpiration)
    );

  res.json(lots);
}


// Sortie automatique FEFO
async function sortieFEFO(req, res) {

  await db.read();

  let { productId, quantite } = req.body;

  quantite = Number(quantite);

  let lots = db.data.lots
    .filter(lot =>
      lot.productId === productId &&
      lot.quantite > 0
    )
    .sort((a, b) =>
      new Date(a.dateExpiration) -
      new Date(b.dateExpiration)
    );


  let reste = quantite;
  let sorties = [];


  for (let lot of lots) {

    if (reste <= 0) break;


    let prendre = Math.min(
      lot.quantite,
      reste
    );


    lot.quantite -= prendre;

    reste -= prendre;


    sorties.push({
      lot: lot.numeroLot,
      quantite: prendre
    });


    if (lot.quantite === 0) {
      lot.statut = "TERMINE";
    }
  }


  await db.write();


  res.json({
    message: "Sortie FEFO réalisée",
    sorties,
    manque: reste
  });
}


module.exports = {
  addLot,
  getLotsFEFO,
  sortieFEFO
};

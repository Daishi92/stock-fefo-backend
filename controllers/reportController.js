const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {});


async function getReport(req, res) {
  await db.read();

  const products = db.data.products || [];
  const movements = db.data.movements || [];

  const totalProduits = products.length;

  const stockTotal = products.reduce(
    (total, p) => total + Number(p.quantite || 0),
    0
  );

  const expires = products.filter(
    p => new Date(p.dateExpiration) < new Date()
  );

  res.json({
    totalProduits,
    stockTotal,
    produitsExpires: expires.length,
    mouvements: movements.length
  });
}


module.exports = {
  getReport
};

const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");

const db = new Low(adapter, {
  products: [],
  movements: [],
  lots: []
});


async function getDashboard(req, res) {

  await db.read();

  const produits = db.data.products || [];
  const lots = db.data.lots || [];
  const mouvements = db.data.movements || [];


  const totalProduits = produits.length;

  const stockTotal = produits.reduce(
    (total, p) => total + Number(p.quantite || 0),
    0
  );


  const aujourdHui = new Date();


  const expires = produits.filter(p =>
    new Date(p.dateExpiration) < aujourdHui
  );


  const urgents = produits.filter(p => {

    const jours = Math.ceil(
      (new Date(p.dateExpiration) - aujourdHui) /
      (1000 * 60 * 60 * 24)
    );

    return jours >= 0 && jours <= 30;
  });


  res.json({
    totalProduits,
    stockTotal,
    produitsExpires: expires.length,
    produitsUrgents: urgents.length,
    totalLots: lots.length,
    mouvements: mouvements.length
  });

}


module.exports = {
  getDashboard
};

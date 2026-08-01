const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");

const db = new Low(adapter, {
  products: []
});

async function getAlerts(req, res) {
  await db.read();

  const today = new Date();

  const alerts = db.data.products.map(product => {

    const expiration = new Date(product.dateExpiration);

    const jours = Math.ceil(
      (expiration - today) / (1000 * 60 * 60 * 24)
    );

    let statut = "NORMAL";

    if (jours < 0) {
      statut = "EXPIRE";
    } else if (jours <= 30) {
      statut = "URGENT";
    }

    return {
      nom: product.nom,
      lot: product.lot,
      dateExpiration: product.dateExpiration,
      joursRestants: jours,
      statut
    };

  });

  res.json(alerts);
}

module.exports = {
  getAlerts
};

const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {});


async function exportProducts(req, res) {
  await db.read();

  const products = db.data.products || [];

  res.json(products);
}


module.exports = {
  exportProducts
};

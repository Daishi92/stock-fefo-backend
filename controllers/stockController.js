const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");

const db = new Low(adapter, {
  products: [],
  movements: []
});


// Entrée de stock
async function stockEntry(req, res) {
  await db.read();

  const { productId, quantite } = req.body;

  const product = db.data.products.find(
    p => p.id === productId || p.codeBarre === productId
  );

  if (!product) {
    return res.status(404).json({
      message: "Produit introuvable"
    });
  }

  product.quantite += Number(quantite);

  db.data.movements.push({
    id: Date.now().toString(),
    type: "ENTREE",
    produit: product.nom || product.name,
    codeBarre: product.codeBarre || "N/A",
    numeroLot: product.numeroLot || "N/A",
    quantite: Number(quantite),
    motif: "Entrée de stock",
    date: new Date().toISOString()
  });

  await db.write();

  res.json({
    message: "Entrée enregistrée",
    produit: product
  });
}


// Sortie FEFO
async function stockExit(req, res) {
  await db.read();

  const { codeBarre, productId, id, quantite } = req.body;
  const searchKey = codeBarre || productId || id;

  let produit = db.data.products.find(
    p => p.id === searchKey || p.codeBarre === searchKey
  );

  if (!produit) {
    return res.status(404).json({
      message: "Produit introuvable"
    });
  }

  if (produit.quantite < Number(quantite)) {
    return res.status(400).json({
      message: "Stock insuffisant"
    });
  }

  produit.quantite -= Number(quantite);

  db.data.movements.push({
    id: Date.now().toString(),
    type: "SORTIE_FEFO",
    produit: produit.nom || produit.name,
    codeBarre: produit.codeBarre || "N/A",
    numeroLot: produit.numeroLot || "N/A",
    quantite: Number(quantite),
    motif: "Vente / Sortie FEFO",
    date: new Date().toISOString()
  });

  await db.write();

  res.json({
    message: "Sortie FEFO effectuée",
    stockRestant: produit.quantite
  });
}


module.exports = {
  stockEntry,
  stockExit
};

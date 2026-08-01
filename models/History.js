const { v4: uuidv4 } = require("uuid");

class History {
  constructor(data) {
    this.id = uuidv4();
    this.type = data.type;
    this.action = data.action;
    this.produit = data.produit || "";
    this.productId = data.productId || "";
    this.quantite = data.quantite || 0;
    this.utilisateur = data.utilisateur || "Système";
    this.date = new Date().toISOString();
    this.createdAt = new Date().toISOString();
  }
}

module.exports = History;

const { v4: uuidv4 } = require("uuid");

class Damage {
  constructor(data) {
    this.id = uuidv4();
    this.productId = data.productId;
    this.produit = data.produit;
    this.quantite = data.quantite;
    this.raison = data.raison || "AUTRE";
    this.date = new Date().toISOString();
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Damage;

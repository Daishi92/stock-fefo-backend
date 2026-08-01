const { v4: uuidv4 } = require("uuid");

class Supplier {
  constructor(data) {
    this.id = uuidv4();
    this.nom = data.nom;
    this.telephone = data.telephone || "";
    this.email = data.email || "";
    this.adresse = data.adresse || "";
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Supplier;

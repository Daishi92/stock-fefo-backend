const { v4: uuidv4 } = require("uuid");

class Warehouse {
  constructor(data) {
    this.id = uuidv4();
    this.nom = data.nom;
    this.adresse = data.adresse || "";
    this.responsable = data.responsable || "";
    this.statut = data.statut || "ACTIF";
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Warehouse;

const { v4: uuidv4 } = require("uuid");

class Inventory {
  constructor(data) {
    this.id = uuidv4();
    this.warehouseId = data.warehouseId;
    this.date = new Date().toISOString();
    this.statut = data.statut || "EN_COURS";
    this.lignes = data.lignes || [];
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Inventory;

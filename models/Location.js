const { v4: uuidv4 } = require("uuid");

class Location {
  constructor(data) {
    this.id = uuidv4();
    this.warehouseId = data.warehouseId;
    this.nom = data.nom;
    this.zone = data.zone || "";
    this.rayon = data.rayon || "";
    this.etagere = data.etagere || "";
    this.case = data.case || "";
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Location;

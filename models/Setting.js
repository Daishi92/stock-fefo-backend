const { v4: uuidv4 } = require("uuid");

class Setting {
  constructor(data) {
    this.id = uuidv4();
    this.nomEntreprise = data.nomEntreprise || "Stock FEFO Pro";
    this.seuilExpiration = data.seuilExpiration || 30;
    this.regleFEFO = data.regleFEFO || true;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Setting;

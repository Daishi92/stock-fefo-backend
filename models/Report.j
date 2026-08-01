const { v4: uuidv4 } = require("uuid");

class Report {
  constructor(data) {
    this.id = uuidv4();
    this.type = data.type;
    this.titre = data.titre || "";
    this.data = data.data || {};
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Report;

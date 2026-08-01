const { v4: uuidv4 } = require("uuid");

class Category {
  constructor(data) {
    this.id = uuidv4();
    this.nom = data.nom;
    this.description = data.description || "";
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Category;

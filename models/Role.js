const { v4: uuidv4 } = require("uuid");

class Role {
  constructor(data) {
    this.id = uuidv4();
    this.nom = data.nom;
    this.permissions = data.permissions || [];
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Role;

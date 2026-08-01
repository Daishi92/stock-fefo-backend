const { v4: uuidv4 } = require("uuid");

function createUser(data) {
  return {
    id: uuidv4(),
    nom: data.nom,
    email: data.email,
    password: data.password,
    role: data.role || "Magasinier",
    createdAt: new Date().toISOString()
  };
}

module.exports = createUser;

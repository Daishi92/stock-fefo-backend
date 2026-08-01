const Role = require("../models/Role");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {
  roles: []
});


// Créer un rôle
async function createRole(req, res) {
  await db.read();

  db.data.roles ||= [];

  const role = new Role(req.body);

  db.data.roles.push(role);

  await db.write();

  res.json({
    message: "Rôle créé",
    role
  });
}


// Liste des rôles
async function getRoles(req, res) {
  await db.read();

  db.data.roles ||= [];

  res.json(db.data.roles);
}


module.exports = {
  createRole,
  getRoles
};

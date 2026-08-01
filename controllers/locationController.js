const Location = require("../models/Location");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {
  locations: []
});


// Créer un emplacement
async function createLocation(req, res) {
  await db.read();

  db.data.locations ||= [];

  const location = new Location(req.body);

  db.data.locations.push(location);

  await db.write();

  res.json({
    message: "Emplacement créé",
    location
  });
}


// Liste des emplacements
async function getLocations(req, res) {
  await db.read();

  db.data.locations ||= [];

  res.json(db.data.locations);
}


// Supprimer un emplacement
async function deleteLocation(req, res) {
  await db.read();

  db.data.locations =
    db.data.locations.filter(
      l => l.id !== req.params.id
    );

  await db.write();

  res.json({
    message: "Emplacement supprimé"
  });
}


module.exports = {
  createLocation,
  getLocations,
  deleteLocation
};

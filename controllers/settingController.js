const Setting = require("../models/Setting");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {
  settings: []
});


// Créer / enregistrer les paramètres
async function createSetting(req, res) {
  await db.read();

  db.data.settings ||= [];

  const setting = new Setting(req.body);

  db.data.settings.push(setting);

  await db.write();

  res.json({
    message: "Paramètres enregistrés",
    setting
  });
}


// Voir les paramètres
async function getSettings(req, res) {
  await db.read();

  db.data.settings ||= [];

  res.json(db.data.settings);
}


module.exports = {
  createSetting,
  getSettings
};

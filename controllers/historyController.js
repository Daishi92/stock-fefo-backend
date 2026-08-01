const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {
  history: [],
  movements: []
});


// Ajouter une action dans l'historique
async function createHistory(req, res) {
  await db.read();

  db.data.history ||= [];

  const newEntry = {
    id: Date.now().toString(),
    ...req.body,
    date: req.body.date || new Date().toISOString()
  };

  db.data.history.push(newEntry);

  await db.write();

  res.json({
    message: "Historique enregistré",
    history: newEntry
  });
}


// Voir tout l'historique (combine history et movements pour ne rien rater)
async function getHistory(req, res) {
  await db.read();

  db.data.history ||= [];
  db.data.movements ||= [];

  // On fusionne les deux tableaux pour être sûr de tout afficher sur l'interface
  const combined = [...db.data.history, ...db.data.movements].sort((a, b) => {
    return new Date(b.date || 0) - new Date(a.date || 0);
  });

  res.json(combined);
}


// Supprimer une entrée historique
async function deleteHistory(req, res) {
  await db.read();

  db.data.history ||= [];
  db.data.movements ||= [];

  db.data.history = db.data.history.filter(h => String(h.id) !== String(req.params.id));
  db.data.movements = db.data.movements.filter(m => String(m.id) !== String(req.params.id));

  await db.write();

  res.json({
    message: "Historique supprimé"
  });
}


module.exports = {
  createHistory,
  getHistory,
  deleteHistory
};

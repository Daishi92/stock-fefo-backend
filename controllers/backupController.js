const fs = require("fs");

const dbPath = "./database/db.json";


// Créer une sauvegarde
function createBackup(req, res) {
  const backupName =
    `./database/backup-${Date.now()}.json`;

  fs.copyFileSync(dbPath, backupName);

  res.json({
    message: "Sauvegarde créée",
    fichier: backupName
  });
}


// Restaurer une sauvegarde
function restoreBackup(req, res) {
  const file = req.body.fichier;

  if (!file) {
    return res.status(400).json({
      message: "Fichier de sauvegarde manquant"
    });
  }

  fs.copyFileSync(file, dbPath);

  res.json({
    message: "Restauration terminée"
  });
}


module.exports = {
  createBackup,
  restoreBackup
};

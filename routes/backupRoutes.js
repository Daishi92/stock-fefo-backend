const express = require("express");
const router = express.Router();

const {
  createBackup,
  restoreBackup
} = require("../controllers/backupController");


// Créer une sauvegarde
router.post("/create", createBackup);

// Restaurer une sauvegarde
router.post("/restore", restoreBackup);


module.exports = router;

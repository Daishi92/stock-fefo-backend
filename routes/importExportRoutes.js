const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const { verifyToken } = require("../middleware/authMiddleware");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, { products: [] });
const upload = multer({ dest: 'uploads/' });

const {
  exportProducts,
  exportPDF
} = require("../controllers/importExportController");

// Export produits JSON (Réservé au Magasinier/Utilisateur connecté)
router.get("/products", verifyToken, exportProducts);

// Export rapport PDF (Réservé au Magasinier/Utilisateur connecté)
router.get("/pdf", verifyToken, exportPDF);

// Route pour l'import du fichier CSV (Réservé au Magasinier/Utilisateur connecté)
router.post('/upload-csv', verifyToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier fourni" });
    }

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Supprimer le fichier temporaire après lecture
    fs.unlinkSync(filePath);

    // Lecture et initialisation de la base Lowdb
    await db.read();
    db.data.products = db.data.products || [];

    // On analyse les lignes du fichier CSV
    const lines = fileContent.split(/\r?\n/).filter(line => line.trim() !== "");

    let addedCount = 0;
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 2) {
        const nomProduit = parts[0].trim();
        const quantiteAjoutee = parseInt(parts[1]) || 0;

        // Vérifier si le produit existe déjà (insensible à la casse)
        const existingProduct = db.data.products.find(
          p => p.name.toLowerCase() === nomProduit.toLowerCase()
        );

        if (existingProduct) {
          existingProduct.quantity += quantiteAjoutee;
        } else {
          db.data.products.push({
            id: Date.now() + i,
            name: nomProduit,
            quantity: quantiteAjoutee,
            createdAt: new Date().toISOString()
          });
        }
        addedCount++;
      }
    }
    await db.write();

    console.log("CSV reçu et importé avec succès :", req.file.originalname);

    res.status(200).json({
      message: "Import CSV et enregistrement réussis !",
      filename: req.file.originalname,
      productsAdded: addedCount
    });

  } catch (error) {
    console.error("Erreur import CSV :", error);
    res.status(500).json({ message: "Erreur interne lors de l'import" });
  }
});

module.exports = router;

const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const PDFDocument = require("pdfkit");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {});


// Export JSON produits
async function exportProducts(req, res) {
  await db.read();

  const products = db.data.products || [];

  res.json(products);
}


// Export PDF produits
async function exportPDF(req, res) {
  await db.read();

  const products = db.data.products || [];

  const doc = new PDFDocument();

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=stock-fefo-rapport.pdf"
  );

  doc.pipe(res);

  doc.fontSize(18)
    .text("Rapport Stock FEFO Pro");

  doc.moveDown();

  products.forEach((p, index) => {
    doc.fontSize(12).text(
      `${index + 1}. ${p.nom} | Quantité: ${p.quantite} | Expiration: ${p.dateExpiration}`
    );
  });

  doc.end();
}


module.exports = {
  exportProducts,
  exportPDF
};

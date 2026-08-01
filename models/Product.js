const { v4: uuidv4 } = require("uuid");

function createProduct(data) {
  return {
    id: uuidv4(),

    nom: data.nom,
    codeBarre: data.codeBarre,
    image: data.image || "",

    categorie: data.categorie || "Non définie",

    lot: data.lot,

    dateFabrication: data.dateFabrication,
    dateExpiration: data.dateExpiration,

    quantite: Number(data.quantite) || 0,

    emplacement: data.emplacement || "Non défini",

    createdAt: new Date().toISOString()
  };
}

module.exports = createProduct;

const { v4: uuidv4 } = require("uuid");

function createLot(data) {
  return {
    id: uuidv4(),

    productId: data.productId,

    numeroLot: data.numeroLot,

    quantite: Number(data.quantite) || 0,

    dateEntree: data.dateEntree || new Date().toISOString(),

    dateExpiration: data.dateExpiration,

    emplacement: data.emplacement || "Non défini",

    statut: "ACTIF"
  };
}

module.exports = createLot;

import { useState, useEffect } from "react";

function Outputs() {
  const [period, setPeriod] = useState("day");
  const [outputsData, setOutputsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger l'historique combiné depuis /api/history
  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => {
        // On filtre pour ne garder que les sorties/mouvements pertinents (optionnel) ou tout afficher
        setOutputsData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de l'historique :", err);
        setOutputsData([]);
        setLoading(false);
      });
  }, []);

  const filteredData = outputsData.filter((item) => {
    const targetDate = item.date || item.dateSortie || item.dateExpiration;
    if (!targetDate) return true;
    const itemDate = new Date(targetDate);
    const today = new Date();

    if (period === "day") {
      return itemDate.toDateString() === today.toDateString();
    } else if (period === "week") {
      const diffTime = Math.abs(today - itemDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    } else if (period === "month") {
      return (
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear()
      );
    }
    return true;
  });

  return (
    <div className="page-container" style={{ padding: "20px", color: "white" }}>
      <h2>📤 Historique des Sorties de Stock</h2>
      <p style={{ color: "#aaa" }}>Suivi des ventes et des mouvements par période.</p>

      {/* Boutons de filtrage par période */}
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setPeriod("day")}
          style={{ padding: "8px 15px", background: period === "day" ? "#ff0044" : "#222", color: period === "day" ? "#fff" : "#aaa", border: "1px solid #333", cursor: "pointer", borderRadius: "8px", fontWeight: "bold" }}
        >
          Par Jour
        </button>
        <button
          onClick={() => setPeriod("week")}
          style={{ padding: "8px 15px", background: period === "week" ? "#ff0044" : "#222", color: period === "week" ? "#fff" : "#aaa", border: "1px solid #333", cursor: "pointer", borderRadius: "8px", fontWeight: "bold" }}
        >
          Par Semaine
        </button>
        <button
          onClick={() => setPeriod("month")}
          style={{ padding: "8px 15px", background: period === "month" ? "#ff0044" : "#222", color: period === "month" ? "#fff" : "#aaa", border: "1px solid #333", cursor: "pointer", borderRadius: "8px", fontWeight: "bold" }}
        >
          Par Mois
        </button>
      </div>

      {/* Tableau d'affichage */}
      <div style={{ overflowX: "auto" }}>
        {loading ? (
          <p>Chargement des sorties...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#161616", borderRadius: "12px", overflow: "hidden" }}>
            <thead>
              <tr style={{ background: "#222", textAlign: "left", borderBottom: "1px solid #333", color: "#aaa", fontSize: "12px" }}>
                <th style={{ padding: "12px" }}>Produit</th>
                <th style={{ padding: "12px" }}>Code-Barre</th>
                <th style={{ padding: "12px" }}>N° de Lot</th>
                <th style={{ padding: "12px" }}>Quantité</th>
                <th style={{ padding: "12px" }}>Motif / Statut</th>
                <th style={{ padding: "12px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                  const isVendu = item.motif === "vendu" || item.type === "SORTIE_FEFO" || item.type === "VENTE";
                  return (
                    <tr key={item.id || index} style={{ borderBottom: "1px solid #222" }}>
                      <td style={{ padding: "12px", fontWeight: "bold" }}>{item.produit || item.nom || item.productName || "Produit"}</td>
                      <td style={{ padding: "12px", color: "#888" }}>{item.codeBarre || "-"}</td>
                      <td style={{ padding: "12px", color: "#aaa" }}>{item.numeroLot || item.batch || "-"}</td>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "#ff0044" }}>-{item.quantite || 0}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          background: isVendu ? "rgba(0, 255, 136, 0.15)" : "rgba(255, 0, 68, 0.15)",
                          color: isVendu ? "#00ff88" : "#ff0044",
                          border: `1px solid ${isVendu ? "#00ff88" : "#ff0044"}`
                        }}>
                          {item.type || (isVendu ? "💰 VENDU" : "🗑️ MOUVEMENT")}
                        </span>
                      </td>
                      <td style={{ padding: "12px", color: "#aaa" }}>{item.date ? new Date(item.date).toLocaleDateString() : "-"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                    Aucune sortie enregistrée pour cette période.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Outputs;

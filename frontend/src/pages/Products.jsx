import React, { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupération des produits depuis ton backend
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des produits:", err);
        setError("Impossible de charger les produits.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: "20px" }}>Chargement des produits...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestion des Produits</h2>
      <p>Liste globale de votre stock enregistrée dans la base de données.</p>

      {products.length === 0 ? (
        <p>Aucun produit trouvé pour le moment.</p>
      ) : (
        <div style={{ overflowX: "auto", marginTop: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
            <thead>
              <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Nom</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Quantité</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date de péremption</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id || index}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.name || product.nom}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.quantity || product.quantite}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.expiryDate || product.date_peremption || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Products;

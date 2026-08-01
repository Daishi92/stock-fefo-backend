import { useEffect, useState } from "react";
import axios from "axios";

import {
  Package,
  Boxes,
  CalendarX,
  TriangleAlert,
  Layers,
  ArrowLeftRight,
} from "lucide-react";

import "../App.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProduits: 0,
    stockTotal: 0,
    produitsExpires: 0,
    produitsUrgents: 0,
    totalLots: 0,
    mouvements: 0,
  });

  const [apiStatus, setApiStatus] = useState("Connexion...");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard")

      .then((response) => {
        setStats(response.data);

        setApiStatus("Serveur connecté");
      })

      .catch(() => {
        setApiStatus("Mode local - serveur indisponible");
      });
  }, []);

  const cards = [
    {
      title: "Produits",
      value: stats.totalProduits,
      icon: <Package />,
    },

    {
      title: "Stock total",
      value: stats.stockTotal,
      icon: <Boxes />,
    },

    {
      title: "Produits expirés",
      value: stats.produitsExpires,
      icon: <CalendarX />,
    },

    {
      title: "Alertes urgentes",
      value: stats.produitsUrgents,
      icon: <TriangleAlert />,
    },

    {
      title: "Lots",
      value: stats.totalLots,
      icon: <Layers />,
    },

    {
      title: "Mouvements",
      value: stats.mouvements,
      icon: <ArrowLeftRight />,
    },
  ];

  return (
    <div className="dashboard-dark">
      <header className="fefo-banner">
        <div className="brand-title">
          <h1>GESTION DE STOCK FEFO</h1>

          <div className="box-3d">📦</div>
        </div>

        <p>Centre de contrôle intelligent des stocks</p>
      </header>

      <div className="system-status">🟢 {apiStatus}</div>

      <div className="cards">
        {cards.map((card, index) => (
          <div className="card-fefo" key={index}>
            <div className="card-icon">{card.icon}</div>

            <h3>{card.title}</h3>

            <strong>{card.value}</strong>
          </div>
        ))}
      </div>

      <section className="stock-status">
        <h2>ÉTAT DU STOCK</h2>

        <div className="status-grid">
          <div className="status-card normal">
            <h3>Stock total</h3>

            <strong>{stats.stockTotal}</strong>

            <p>Quantité disponible</p>
          </div>

          <div className="status-card warning">
            <h3>Alertes urgentes</h3>

            <strong>{stats.produitsUrgents}</strong>

            <p>Produits proches expiration</p>
          </div>

          <div className="status-card danger">
            <h3>Produits expirés</h3>

            <strong>{stats.produitsExpires}</strong>

            <p>Action nécessaire</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

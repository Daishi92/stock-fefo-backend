import {
  LayoutDashboard,
  Package,
  Boxes,
  TriangleAlert,
  ShieldCheck,
  ArrowLeftRight,
  Layers,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar({ menuOpen, closeMenu }) {

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard />,
    },

    {
      name: "Produits",
      path: "/products",
      icon: <Package />,
    },

    {

    name: "Entrée stock",

      path: "/entries",
      icon: <Boxes />,
    },

    {
      name: "Sorties stock",
      path: "/outputs",
      icon: <ArrowLeftRight />,
    },


    {
      name: "Alertes FEFO",
      path: "/alerts",
      icon: <TriangleAlert />,
    },


    {
     name: "ADMIN",

      path: "/admin",
      icon: <ShieldCheck />,
    },
  ];

  return (
    <aside className={`sidebar ${menuOpen ? "open" : "closed"}`}>
      <div className="sidebar-logo">GESTION FEFO 📦</div>

      <nav>
        {menu.map((item, index) => (
          <NavLink
            key={index}

            to={item.path}

            onClick={closeMenu}

            className="sidebar-link"
          >
            <span>{item.icon}</span>

            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

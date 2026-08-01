function Header({ toggleMenu }) {
  return (
    <header className="header" style={{ display: "flex", alignItems: "center", padding: "0 15px", background: "#121212" }}>
      <button className="menu-button" onClick={toggleMenu} style={{ background: "transparent", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>
        ☰
      </button>
<span style={{ color: "#ffffff", fontSize: "15px", fontWeight: "700", fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.5px", margin: "0 auto", transform: "translateX(-15px)" }}>



        Centre de contrôle intelligent des stocks
      </span>
    </header>
  );
}

export default Header;

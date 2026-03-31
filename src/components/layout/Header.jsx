export default function Header({ page, menuOpen, setMenuOpen, setPage, handleDashClick }) {
  return (
    <>
      <div className="top-contact-bar">
        <span>Τηλέφωνο εξυπηρέτησης</span>
        <a href="tel:2109015391">210 9015391</a>
      </div>

      <nav className="nav">
        <div
          className="logo"
          onClick={() => {
            setPage("home");
            setMenuOpen(false);
          }}
        >
          ΕΛΑΣΤΙΚΑ <span>ΓΙΟΒΑΝΗΣ</span>
          <small>Επαγγελματικά Ελαστικά</small>
        </div>
        <div className="nav-links">
          <a onClick={() => setPage("home")} className={page === "home" ? "act" : ""}>
            Αρχική
          </a>
          <a onClick={() => setPage("products")} className={page === "products" ? "act" : ""}>
            Προϊόντα
          </a>
          <a
            onClick={() => {
              setPage("home");
              setTimeout(
                () => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" }),
                100,
              );
            }}
          >
            Υπηρεσίες
          </a>
          <a
            onClick={() => {
              setPage("home");
              setTimeout(
                () => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" }),
                100,
              );
            }}
          >
            Επικοινωνία
          </a>
          <button className={`nav-admin-btn ${page === "dashboard" ? "act" : ""}`} onClick={handleDashClick}>
            🔧 Διαχείριση
          </button>
        </div>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a
          onClick={() => {
            setPage("home");
            setMenuOpen(false);
          }}
        >
          Αρχική
        </a>
        <a
          onClick={() => {
            setPage("products");
            setMenuOpen(false);
          }}
        >
          Προϊόντα
        </a>
        <a
          onClick={() => {
            setPage("home");
            setMenuOpen(false);
            setTimeout(
              () => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" }),
              150,
            );
          }}
        >
          Υπηρεσίες
        </a>
        <a
          onClick={() => {
            setPage("home");
            setMenuOpen(false);
            setTimeout(
              () => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" }),
              150,
            );
          }}
        >
          Επικοινωνία
        </a>
        <button className="mob-admin" onClick={handleDashClick}>
          🔧 Διαχείριση
        </button>
      </div>
    </>
  );
}

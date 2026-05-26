export default function Header({ page, menuOpen, setMenuOpen, setPage, handleDashClick }) {
  return (
    <>
      <div className="top-contact-bar">
        <span>Τηλέφωνο εξυπηρέτησης</span>
        <a href="tel:2109015391">210 9015391</a>
      </div>

      <nav className="nav">
        <button
          type="button"
          className="logo"
          onClick={() => {
            setPage("home");
            setMenuOpen(false);
          }}
        >
          ΕΛΑΣΤΙΚΑ <span>ΓΙΟΒΑΝΗΣ</span>
          <small>Επαγγελματικά Ελαστικά</small>
        </button>
        <div className="nav-links">
          <button type="button" onClick={() => setPage("home")} className={page === "home" ? "act" : ""}>
            Αρχική
          </button>
          <button type="button" onClick={() => setPage("products")} className={page === "products" ? "act" : ""}>
            Προϊόντα
          </button>
          <button
            type="button"
            onClick={() => {
              setPage("home");
              setTimeout(
                () => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" }),
                100,
              );
            }}
          >
            Υπηρεσίες
          </button>
          <button
            type="button"
            onClick={() => {
              setPage("home");
              setTimeout(
                () => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" }),
                100,
              );
            }}
          >
            Επικοινωνία
          </button>
          <button type="button" className={`nav-admin-btn ${page === "dashboard" ? "act" : ""}`} onClick={handleDashClick}>
            🔧 Διαχείριση
          </button>
        </div>
        <button type="button" className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          type="button"
          onClick={() => {
            setPage("home");
            setMenuOpen(false);
          }}
        >
          Αρχική
        </button>
        <button
          type="button"
          onClick={() => {
            setPage("products");
            setMenuOpen(false);
          }}
        >
          Προϊόντα
        </button>
        <button
          type="button"
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
        </button>
        <button
          type="button"
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
        </button>
        <button type="button" className="mob-admin" onClick={handleDashClick}>
          🔧 Διαχείριση
        </button>
      </div>
    </>
  );
}

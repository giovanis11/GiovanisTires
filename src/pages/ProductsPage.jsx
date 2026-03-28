export default function ProductsPage({
  searchLabel,
  setPage,
  chips,
  filteredProducts,
  sortBy,
  setSortBy,
  sidebarOpen,
  setSidebarOpen,
  renderSidebar,
  viewMode,
  setViewMode,
  clearAll,
  isLoading,
  dataError,
}) {
  return (
    <div className="products-page">
      <div className="products-topbar">
        <button className="back-btn" onClick={() => setPage("home")}>
          ← Πίσω
        </button>
        <div className="topbar-title">
          ΕΛΑΣΤΙΚΑ {searchLabel && <span>{searchLabel}</span>}
        </div>
        <div className="topbar-right">
          <button className="mob-filter-btn" onClick={() => setSidebarOpen(true)}>
            ⚙ Φίλτρα {chips.length > 0 && `(${chips.length})`}
          </button>
          <span className="topbar-count">{filteredProducts.length} αποτελέσματα</span>
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="relevance">Σχετικότητα</option>
            <option value="price_asc">Τιμή Σετ 4: Χαμηλότερη</option>
            <option value="price_desc">Τιμή Σετ 4: Υψηλότερη</option>
            <option value="name">Αλφαβητικά</option>
          </select>
        </div>
      </div>
      {chips.length > 0 && (
        <div className="active-filters">
          <span className="active-label">Φίλτρα:</span>
          {chips.map((c, i) => (
            <div key={i} className="af-chip" onClick={c.clear}>
              {c.label}
              <span className="af-x">×</span>
            </div>
          ))}
          <button className="clear-all-btn" onClick={clearAll}>
            Καθαρισμός όλων
          </button>
        </div>
      )}
      <div className="products-layout">
        <div className={`mob-filter-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />
        <div className={`sidebar ${sidebarOpen ? "mob-open" : ""}`}>
          {sidebarOpen && (
            <div
              style={{
                padding: "12px 14px",
                borderBottom: "1px solid #1a1a1a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 14 }}>Φίλτρα</span>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{ background: "none", border: "none", color: "#888", fontSize: 20, cursor: "pointer" }}
              >
                ×
              </button>
            </div>
          )}
          {renderSidebar()}
        </div>
        <div className="products-main">
          <div className="view-row">
            <span style={{ fontSize: 13, color: "#555", marginRight: "auto" }}>
              {filteredProducts.length} αποτελέσματα
            </span>
            <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
              ⊞ Grid
            </button>
            <button className={`view-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
              ☰ Λίστα
            </button>
          </div>
          {isLoading ? (
            <div className="no-results">
              <div className="emoji">⏳</div>
              <h3>Φορτώνεται ο κατάλογος</h3>
              <p>Γίνεται ανάκτηση προϊόντων από το backend.</p>
            </div>
          ) : dataError ? (
            <div className="no-results">
              <div className="emoji">⚠️</div>
              <h3>Δεν ήταν δυνατή η φόρτωση</h3>
              <p>{dataError}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-results">
              <div className="emoji">🔍</div>
              <h3>Δεν βρέθηκαν ελαστικά</h3>
              <p>Δοκιμάστε να αλλάξετε τα φίλτρα.</p>
              <button className="buy-btn" style={{ marginTop: 20, padding: "9px 22px" }} onClick={clearAll}>
                Καθαρισμός φίλτρων
              </button>
            </div>
          ) : (
            <div className={`products-grid ${viewMode === "list" ? "list" : ""}`}>
              {filteredProducts.map((t) => (
                <div key={t.id} className={`product-card ${viewMode === "list" ? "lc" : ""}`}>
                  <div className="product-img">
                    {t.imageUrl ? (
                      <img src={t.imageUrl} alt={`${t.brand} ${t.name}`} className="product-thumb" loading="lazy" />
                    ) : (
                      "🛞"
                    )}
                  </div>
                  <div className="product-info">
                    <div className="brand-tag">{t.brand}</div>
                    <div className="product-name">{t.name}</div>
                    <div className="product-dim">
                      {t.width}/{t.aspect} R{t.rim} · {t.type}
                    </div>
                    <div className="label-row">
                      <span className={`lbadge lb-f-${t.fuel}`}>⛽{t.fuel}</span>
                      <span className={`lbadge lb-w-${t.wet}`}>💧{t.wet}</span>
                      <span className="lbadge lb-noise">🔊{t.noise}dB</span>
                      <span className="lbadge lb-info">
                        {t.load}/{t.speed}
                      </span>
                    </div>
                    <div className="product-footer">
                      <div className="price">
                        {t.price}€ <span>/σετ 4</span>
                      </div>
                      <button className="buy-btn">Αγορά</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

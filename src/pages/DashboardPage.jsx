import { Fragment, useRef, useState } from "react";
import {
  ASPECTS,
  BLANK,
  BRANDS_LIST,
  BRAND_ICONS,
  FUELS,
  FUEL_COLORS,
  RIMS,
  TYPES,
  WETS,
  WET_COLORS,
  WIDTHS,
} from "../constants/appData";
import { optimizeImageFile } from "../utils/imageUpload";

export default function DashboardPage({
  dashTab,
  setDashTab,
  tires,
  outOfStk,
  lowStk,
  totalV,
  avgPrice,
  brandBreakdown,
  maxBC,
  formStep,
  form,
  customBrands,
  formErrors,
  setF,
  setForm,
  setFormErrors,
  handleAdd,
  invSearch,
  setInvSearch,
  dimSearch,
  setDimSearch,
  dimApplied,
  setDimApplied,
  filteredBrands,
  openBrands,
  toggleBrand,
  invFiltered,
  setEditTire,
  setDelTire,
  isSaving,
  onSignOut,
}) {
  const addImageInputRef = useRef(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const brandOptions = [...new Set([...BRANDS_LIST.filter((brand) => brand !== "Άλλη μάρκα"), ...customBrands, ...tires.map((tire) => tire.brand).filter(Boolean)])]
    .sort((a, b) => a.localeCompare(b, "el"));

  const handleAddImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setImageUploadError("");
    setIsUploadingImage(true);

    try {
      const { file: optimizedFile, previewUrl } = await optimizeImageFile(file);
      setForm((current) => ({
        ...current,
        imageFile: optimizedFile,
        imagePreviewUrl: previewUrl,
        imageUrl: "",
      }));
    } catch (error) {
      setImageUploadError(error instanceof Error ? error.message : "Αποτυχία ανεβάσματος εικόνας.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="dash-wrap">
      <div className="dash-sidenav">
        <div className="dash-sidenav-title">
          <div className="logo" style={{ fontSize: 16, letterSpacing: 2, cursor: "default" }}>
            ΕΛΑΣΤΙΚΑ <span style={{ color: "var(--red)" }}>ΓΙΟΒΑΝΗΣ</span>
            <small
              style={{
                display: "block",
                fontFamily: "Outfit",
                fontSize: 9,
                letterSpacing: 3,
                color: "var(--gray-light)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Διαχείριση
            </small>
          </div>
        </div>
        {[
          { id: "overview", icon: "📊", label: "Επισκόπηση" },
          { id: "add", icon: "➕", label: "Νέο Ελαστικό" },
          { id: "inventory", icon: "📦", label: "Αποθήκη" },
        ].map((item) => (
          <button
            key={item.id}
            className={`dash-nav-btn ${dashTab === item.id ? "dn-act" : ""}`}
            onClick={() => setDashTab(item.id)}
          >
            <span className="dash-nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
        <div className="dash-sidenav-footer">
          Προστατευμένη πρόσβαση
          <br />
          <strong style={{ color: "var(--white)" }}>Password Mode</strong>
          <br />
          <br />
          <strong>{tires.length} ελαστικά</strong> στον κατάλογο
          <br />
          <strong style={{ color: outOfStk > 0 ? "#fb923c" : "#4ade80" }}>{outOfStk}</strong> εκτός αποθέματος
          <br />
          <button
            className="panel-head-action"
            onClick={onSignOut}
            style={{ marginTop: 14, width: "100%", justifyContent: "center" }}
            type="button"
          >
            Αποσύνδεση
          </button>
        </div>
      </div>

      <div className="dash-body">
        {dashTab === "overview" && (
          <>
            <div className="dash-page-title">
              <h1>📊 ΕΠΙΣΚΟΠΗΣΗ</h1>
              <p>Γεια σου! Εδώ βλέπεις μια σύνοψη της αποθήκης σου.</p>
            </div>
            {(outOfStk > 0 || lowStk > 0) && (
              <div className="alert-strip">
                <span className="alert-strip-icon">⚠️</span>
                <div className="alert-strip-text">
                  <strong>{outOfStk} ελαστικά εκτός αποθέματος</strong> και {lowStk} με χαμηλό απόθεμα.
                </div>
                <button className="alert-strip-btn" onClick={() => setDashTab("inventory")}>
                  Δες τα →
                </button>
              </div>
            )}
            <div className="kpi-grid">
              <div className="kpi kpi-r">
                <div className="kpi-ico">🛞</div>
                <div className="kpi-n">{tires.length}</div>
                <div className="kpi-lbl">Σύνολο προϊόντων</div>
                <div className="kpi-note ok">✓ Ενημερωμένος κατάλογος</div>
              </div>
              <div className="kpi kpi-g">
                <div className="kpi-ico">💰</div>
                <div className="kpi-n">{totalV.toLocaleString("el")}€</div>
                <div className="kpi-lbl">Αξία αποθήκης</div>
                <div className="kpi-note ok">↑ Τρέχουσα αξία</div>
              </div>
              <div className="kpi kpi-o">
                <div className="kpi-ico">📉</div>
                <div className="kpi-n">{outOfStk}</div>
                <div className="kpi-lbl">Εκτός αποθέματος</div>
                <div className={`kpi-note ${outOfStk > 2 ? "warn" : "ok"}`}>
                  {outOfStk > 2 ? "⚠ Χρειάζεται προσοχή" : "✓ Υπό έλεγχο"}
                </div>
              </div>
              <div className="kpi kpi-b">
                <div className="kpi-ico">📊</div>
                <div className="kpi-n">{avgPrice}€</div>
                <div className="kpi-lbl">Μέση τιμή σετ 4</div>
                <div className="kpi-note ok">↑ Ανταγωνιστική</div>
              </div>
            </div>
            <div className="two-col">
              <div className="panel">
                <div className="panel-head">
                  <h3>📦 Ανά Μάρκα</h3>
                </div>
                <div className="panel-body">
                  <div className="bbar">
                    {brandBreakdown.map(([brand, count]) => (
                      <div key={brand} className="bbar-row">
                        <span className="bbar-lbl">{brand}</span>
                        <div className="bbar-bg">
                          <div className="bbar-fill" style={{ width: `${(count / maxBC) * 100}%` }} />
                        </div>
                        <span className="bbar-cnt">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-head">
                  <h3>⚡ Δραστηριότητα</h3>
                </div>
                <div className="panel-body">
                  <div className="act-list">
                    {[
                      {
                        dot: "dot-g",
                        text: (
                          <>
                            <strong>Michelin Pilot Sport 5</strong> — Νέο απόθεμα (12 τεμ.)
                          </>
                        ),
                        time: "Σήμερα 10:32",
                      },
                      {
                        dot: "dot-r",
                        text: (
                          <>
                            <strong>Bridgestone Turanza</strong> — Εξαντλήθηκε
                          </>
                        ),
                        time: "Σήμερα 09:14",
                      },
                      {
                        dot: "dot-b",
                        text: (
                          <>
                            <strong>Pirelli P Zero</strong> — Τιμή σετ 4: 210€
                          </>
                        ),
                        time: "Χθες 17:45",
                      },
                      {
                        dot: "dot-o",
                        text: (
                          <>
                            <strong>Hankook Ventus</strong> — Προστέθηκε νέο
                          </>
                        ),
                        time: "Χθες 14:20",
                      },
                      {
                        dot: "dot-g",
                        text: (
                          <>
                            <strong>Continental Winter</strong> — Παραγγελία 20 τεμ.
                          </>
                        ),
                        time: "22/02 11:00",
                      },
                    ].map((a, i) => (
                      <div key={i} className="act-item">
                        <div className={`act-dot ${a.dot}`} />
                        <span className="act-text">{a.text}</span>
                        <span className="act-time">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {(outOfStk > 0 || lowStk > 0) && (
              <div className="panel">
                <div className="panel-head">
                  <h3>🚨 Χρειάζονται Προσοχή</h3>
                  <button className="panel-head-action" onClick={() => setDashTab("inventory")}>
                    Επεξεργασία →
                  </button>
                </div>
                <div className="panel-body" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {tires.filter((t) => t.stock <= 3).map((t) => (
                    <div
                      key={t.id}
                      style={{
                        background: "#0d0d0d",
                        border: "1px solid #1e1e1e",
                        borderRadius: 10,
                        padding: "14px 18px",
                        minWidth: 160,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--red)",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        {t.brand}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#555", marginBottom: 10 }}>
                        {t.width}/{t.aspect} R{t.rim}
                      </div>
                      <span className={`tire-stock-badge ${t.stock === 0 ? "s-out" : "s-low"}`}>
                        {t.stock === 0 ? "Εξαντλήθηκε" : `${t.stock} τεμ. απομένουν`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {dashTab === "add" && (
          <>
            <div className="dash-page-title">
              <h1>➕ ΝΕΟ ΕΛΑΣΤΙΚΟ</h1>
              <p>Συμπλήρωσε τα στοιχεία παρακάτω.</p>
            </div>
            <div className="add-form-wrap">
              <div className="add-form-hero">
                <div className="add-form-hero-icon">🛞</div>
                <div>
                  <h2>ΦΟΡΜΑ ΠΡΟΣΘΗΚΗΣ</h2>
                  <p>
                    Βήμα {formStep} από 3 —{" "}
                    {formStep === 1
                      ? "Βασικά στοιχεία"
                      : formStep === 2
                        ? "Διαστάσεις & Τιμή Σετ 4"
                        : "Έτοιμο να αποθηκευτεί!"}
                  </p>
                </div>
              </div>
              <div className="form-body">
                <div className="steps">
                  {["Βασικά", "Διαστάσεις", "Ολοκλήρωση"].map((s, i) => (
                    <Fragment key={i}>
                      <div className="step">
                        <div className={`step-num ${formStep > i + 1 ? "done" : formStep === i + 1 ? "current" : ""}`}>
                          {formStep > i + 1 ? "✓" : i + 1}
                        </div>
                        <span className={`step-lbl ${formStep > i + 1 ? "done" : formStep === i + 1 ? "current" : ""}`}>
                          {s}
                        </span>
                      </div>
                      {i < 2 && <div className={`step-line ${formStep > i + 1 ? "done" : ""}`} />}
                    </Fragment>
                  ))}
                </div>
                <div className="sec-title">1. Βασικές Πληροφορίες</div>
                <div className="fg2">
                  <div className="big-field">
                    <label className="big-label">
                      Μάρκα <span className="req">*</span>
                    </label>
                    <p className="big-hint">Διάλεξε υπάρχουσα μάρκα ή γράψε νέα</p>
                    <input
                      list="brand-options"
                      className={`big-input ${formErrors.brand ? "err" : ""}`}
                      placeholder="π.χ. Michelin ή νέα μάρκα"
                      value={form.brand}
                      onChange={(e) => setF("brand", e.target.value)}
                    />
                    <datalist id="brand-options">
                      {brandOptions.map((brand) => (
                        <option key={brand} value={brand} />
                      ))}
                    </datalist>
                    {formErrors.brand && <span className="err-msg">⚠ {formErrors.brand}</span>}
                  </div>
                  <div className="big-field">
                    <label className="big-label">
                      Μοντέλο <span className="req">*</span>
                    </label>
                    <p className="big-hint">π.χ. Pilot Sport 5</p>
                    <input
                      className={`big-input ${formErrors.name ? "err" : ""}`}
                      placeholder="Γράψε το μοντέλο..."
                      value={form.name}
                      onChange={(e) => setF("name", e.target.value)}
                    />
                    {formErrors.name && <span className="err-msg">⚠ {formErrors.name}</span>}
                  </div>
                </div>
                <div className="big-field">
                  <label className="big-label">
                    Περιγραφή <span style={{ color: "#555", fontSize: 12, fontWeight: 400 }}>(προαιρετικό)</span>
                  </label>
                  <textarea
                    className="big-textarea"
                    placeholder="Σύντομη περιγραφή..."
                    value={form.description}
                    onChange={(e) => setF("description", e.target.value)}
                  />
                </div>
                <div className="sec-div" />
                <div className="sec-title">
                  2. Εικόνα Προϊόντος{" "}
                  <span style={{ color: "#555", fontSize: 11, fontWeight: 400, textTransform: "none" }}>· προαιρετικό</span>
                </div>
                <input
                  ref={addImageInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAddImageUpload}
                />
                <button
                  type="button"
                  className="upload-zone"
                  onClick={() => addImageInputRef.current?.click()}
                  disabled={isUploadingImage}
                >
                  <div className="upload-zone-ico">📤</div>
                  <p>{isUploadingImage ? "Γίνεται επεξεργασία εικόνας..." : "Ανέβασε φωτογραφία από τη συσκευή"}</p>
                  <span>JPG, PNG, WEBP · γίνεται αυτόματη βελτιστοποίηση</span>
                </button>
                {imageUploadError && <span className="err-msg">⚠ {imageUploadError}</span>}
                <div className="big-field">
                  <label className="big-label">🖼 URL εικόνας (εναλλακτικά)</label>
                  <p className="big-hint">Αν θέλεις, βάλε URL (π.χ. `https://...`) ή path από το domain σου (π.χ. `/images/tire.jpg`).</p>
                  <input
                    type="url"
                    className="big-input"
                    placeholder="https://example.com/tire.jpg ή /images/tire.jpg"
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm((current) => ({
                        ...current,
                        imageFile: null,
                        imagePreviewUrl: "",
                        imageUrl: e.target.value,
                      }))
                    }
                  />
                </div>
                {(form.imagePreviewUrl || form.imageUrl) && (
                  <>
                    <div className="product-image-preview">
                      <img
                        src={form.imagePreviewUrl || form.imageUrl}
                        alt={`${form.brand || "Ελαστικό"} ${form.name || ""}`.trim()}
                        loading="lazy"
                      />
                    </div>
                    <button
                      type="button"
                      className="big-cancel image-remove-btn"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          imageFile: null,
                          imagePreviewUrl: "",
                          imageUrl: "",
                        }))
                      }
                    >
                      🗑 Αφαίρεση εικόνας
                    </button>
                  </>
                )}
                <div className="sec-div" />
                <div className="sec-title">3. Διαστάσεις</div>
                <div className="fg3">
                  <div className="big-field">
                    <label className="big-label">
                      Πλάτος (mm) <span className="req">*</span>
                    </label>
                    <select
                      className={`big-select ${formErrors.width ? "err" : ""}`}
                      value={form.width}
                      onChange={(e) => setF("width", e.target.value)}
                    >
                      <option value="">Επίλεξε...</option>
                      {WIDTHS.map((w) => (
                        <option key={w}>{w}</option>
                      ))}
                    </select>
                    {formErrors.width && <span className="err-msg">⚠ {formErrors.width}</span>}
                  </div>
                  <div className="big-field">
                    <label className="big-label">
                      Ύψος (%) <span className="req">*</span>
                    </label>
                    <select
                      className={`big-select ${formErrors.aspect ? "err" : ""}`}
                      value={form.aspect}
                      onChange={(e) => setF("aspect", e.target.value)}
                    >
                      <option value="">Επίλεξε...</option>
                      {ASPECTS.map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>
                    {formErrors.aspect && <span className="err-msg">⚠ {formErrors.aspect}</span>}
                  </div>
                  <div className="big-field">
                    <label className="big-label">
                      Ζάντα (ίντσες) <span className="req">*</span>
                    </label>
                    <select
                      className={`big-select ${formErrors.rim ? "err" : ""}`}
                      value={form.rim}
                      onChange={(e) => setF("rim", e.target.value)}
                    >
                      <option value="">Επίλεξε...</option>
                      {RIMS.map((r) => (
                        <option key={r}>R{r}</option>
                      ))}
                    </select>
                    {formErrors.rim && <span className="err-msg">⚠ {formErrors.rim}</span>}
                  </div>
                </div>
                {form.width && form.aspect && form.rim && (
                  <div className="dim-preview">
                    <span className="dim-preview-label">📐 Η διάσταση σου:</span>
                    <span className="dim-preview-val">
                      {form.width}/{form.aspect} R{form.rim.replace("R", "")}
                    </span>
                  </div>
                )}
                <div className="sec-div" />
                <div className="sec-title">4. Εποχή, Τιμή Σετ 4 & Απόθεμα</div>
                <div className="fg3">
                  <div className="big-field">
                    <label className="big-label">
                      Εποχή <span className="req">*</span>
                    </label>
                    <select
                      className={`big-select ${formErrors.type ? "err" : ""}`}
                      value={form.type}
                      onChange={(e) => setF("type", e.target.value)}
                    >
                      <option value="">Επίλεξε...</option>
                      {TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    {formErrors.type && <span className="err-msg">⚠ {formErrors.type}</span>}
                  </div>
                  <div className="big-field">
                    <label className="big-label">
                      💰 Τιμή Σετ 4 (€) <span className="req">*</span>
                    </label>
                    <input
                      type="number"
                      className={`big-input ${formErrors.price ? "err" : ""}`}
                      placeholder="π.χ. 149"
                      value={form.price}
                      onChange={(e) => setF("price", e.target.value)}
                      min={1}
                    />
                    {formErrors.price && <span className="err-msg">⚠ {formErrors.price}</span>}
                  </div>
                  <div className="big-field">
                    <label className="big-label">
                      📦 Απόθεμα <span className="req">*</span>
                    </label>
                    <input
                      type="number"
                      className={`big-input ${formErrors.stock ? "err" : ""}`}
                      placeholder="π.χ. 10"
                      value={form.stock}
                      onChange={(e) => setF("stock", e.target.value)}
                      min={0}
                    />
                    {formErrors.stock && <span className="err-msg">⚠ {formErrors.stock}</span>}
                  </div>
                </div>
                <div className="sec-div" />
                <div className="sec-title">
                  5. Ετικέτες EU <span style={{ color: "#555", fontSize: 11, fontWeight: 400, textTransform: "none" }}>· προαιρετικό</span>
                </div>
                <div className="fg3">
                  <div className="big-field">
                    <label className="big-label">⛽ Κατανάλωση</label>
                    <div className="pill-row">
                      {FUELS.map((g) => (
                        <button
                          key={g}
                          type="button"
                          className={`pill ${form.fuel === g ? "psel" : ""}`}
                          style={form.fuel === g ? { background: FUEL_COLORS[g] } : {}}
                          onClick={() => setF("fuel", g)}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="big-field">
                    <label className="big-label">💧 Υγρό Δρόμο</label>
                    <div className="pill-row">
                      {WETS.map((g) => (
                        <button
                          key={g}
                          type="button"
                          className={`pill ${form.wet === g ? "psel" : ""}`}
                          style={form.wet === g ? { background: WET_COLORS[g] } : {}}
                          onClick={() => setF("wet", g)}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="big-field">
                    <label className="big-label">🔊 Θόρυβος (dB)</label>
                    <input
                      type="number"
                      className="big-input"
                      min={60}
                      max={80}
                      value={form.noise}
                      onChange={(e) => setF("noise", e.target.value)}
                    />
                  </div>
                </div>
                <div className="sec-div" />
                {Object.keys(formErrors).length > 0 && (
                  <div className="form-err-banner" style={{ marginBottom: 16 }}>
                    ⚠️ Παρακαλώ συμπλήρωσε τα υποχρεωτικά πεδία.
                  </div>
                )}
                <div className="submit-row">
                  <button className="big-submit" onClick={handleAdd} disabled={isSaving}>
                    {isSaving ? "ΑΠΟΘΗΚΕΥΣΗ..." : "✅ ΠΡΟΣΘΗΚΗ ΕΛΑΣΤΙΚΟΥ"}
                  </button>
                  <button
                    className="big-cancel"
                    onClick={() => {
                      setForm(BLANK);
                      setFormErrors({});
                    }}
                    disabled={isSaving}
                  >
                    🔄 Καθαρισμός
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {dashTab === "inventory" && (
          <>
            <div className="dash-page-title">
              <h1>📦 ΑΠΟΘΗΚΗ</h1>
              <p>Επεξεργαστείτε ή διαγράψτε ελαστικά.</p>
            </div>
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "20px 22px", marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  marginBottom: 14,
                }}
              >
                🔍 Αναζήτηση
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
                <div style={{ flex: "1 1 200px" }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 7, fontWeight: 600 }}>
                    Αναζήτηση με όνομα / μάρκα
                  </div>
                  <input
                    className="big-search"
                    placeholder="π.χ. Michelin..."
                    value={invSearch}
                    onChange={(e) => setInvSearch(e.target.value)}
                  />
                </div>
                <div style={{ flex: "2 1 280px" }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 7, fontWeight: 600 }}>
                    Αναζήτηση με διαστάσεις
                  </div>
                  <div className="dim-search-row">
                    <input
                      className="dim-inp"
                      placeholder="225"
                      value={dimSearch.width}
                      onChange={(e) => setDimSearch((s) => ({ ...s, width: e.target.value }))}
                      maxLength={3}
                    />
                    <span className="dim-sep">/</span>
                    <input
                      className="dim-inp"
                      placeholder="45"
                      value={dimSearch.aspect}
                      onChange={(e) => setDimSearch((s) => ({ ...s, aspect: e.target.value }))}
                      maxLength={2}
                    />
                    <span className="dim-sep">R</span>
                    <input
                      className="dim-inp"
                      placeholder="17"
                      value={dimSearch.rim}
                      onChange={(e) => setDimSearch((s) => ({ ...s, rim: e.target.value }))}
                      maxLength={2}
                    />
                    <button className="dim-search-btn" onClick={() => setDimApplied({ ...dimSearch })}>
                      🔍 Εύρεση
                    </button>
                    {dimApplied && (
                      <button
                        className="dim-clear-btn"
                        onClick={() => {
                          setDimApplied(null);
                          setDimSearch({ width: "", aspect: "", rim: "" });
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <button
                  className="big-submit"
                  style={{ fontSize: 15, padding: "12px 20px", borderRadius: 8, flexShrink: 0 }}
                  onClick={() => setDashTab("add")}
                >
                  ➕ Νέο
                </button>
              </div>
            </div>
            {filteredBrands.length === 0 ? (
              <div className="empty-state">
                <div className="es-ico">🔍</div>
                <h3>Δεν βρέθηκαν αποτελέσματα</h3>
                <p>Δοκίμασε διαφορετικά κριτήρια.</p>
              </div>
            ) : (
              <div className="brand-accordion">
                {filteredBrands.map((brand) => {
                  const brandTires = invFiltered.filter((t) => t.brand === brand);
                  const brandOut = brandTires.filter((t) => t.stock === 0).length;
                  const isOpen = openBrands[brand] !== false;

                  return (
                    <div key={brand} className="brand-block">
                      <div className="brand-block-header" onClick={() => toggleBrand(brand)}>
                        <div className="brand-logo-circle">{BRAND_ICONS[brand] || "🛞"}</div>
                        <div className="brand-block-info">
                          <div className="brand-block-name">{brand}</div>
                          <div className="brand-block-sub">{brandTires.length} ελαστικά</div>
                        </div>
                        <div className="brand-block-badges">
                          <span className="brand-count-badge">{brandTires.length} τεμ.</span>
                          {brandOut > 0 && <span className="brand-out-badge">⚠ {brandOut} εκτός</span>}
                        </div>
                        <span className={`brand-block-arrow ${isOpen ? "open" : ""}`}>▼</span>
                      </div>
                      {isOpen && (
                        <div className="brand-tire-list">
                          {brandTires.map((t) => (
                            <div key={t.id} className="tire-row">
                              <div className="tire-row-icon">
                                {t.imageUrl ? (
                                  <img src={t.imageUrl} alt={`${t.brand} ${t.name}`} className="tire-row-thumb" loading="lazy" />
                                ) : (
                                  "🛞"
                                )}
                              </div>
                              <div className="tire-row-info">
                                <div className="tire-row-name">{t.name}</div>
                                <div className="tire-row-dim">
                                  📐 {t.width}/{t.aspect} R{t.rim}
                                </div>
                                <div className="tire-row-type">🏷 {t.type}</div>
                              </div>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                <span className={`lbadge lb-f-${t.fuel}`}>⛽{t.fuel}</span>
                                <span className={`lbadge lb-w-${t.wet}`}>💧{t.wet}</span>
                              </div>
                              <div className="tire-row-price">{t.price}€ /4</div>
                              <span className={`tire-stock-badge ${t.stock === 0 ? "s-out" : t.stock <= 3 ? "s-low" : "s-ok"}`}>
                                {t.stock === 0 ? "Εξαντλήθηκε" : t.stock <= 3 ? `⚠ ${t.stock} τεμ.` : `${t.stock} τεμ.`}
                              </span>
                              <div className="tire-row-actions">
                                <button className="action-btn" onClick={() => setEditTire({ ...t })}>
                                  ✏ Επεξεργασία
                                </button>
                                <button className="action-btn del-btn" onClick={() => setDelTire(t)}>
                                  🗑
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

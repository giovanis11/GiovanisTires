import { FUELS, TYPES, WETS } from "../../constants/appData";

export default function EditTireModal({ tire, setEditTire, onClose, onSave }) {
  if (!tire) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hdr">
          <div>
            <h2>✏ ΕΠΕΞΕΡΓΑΣΙΑ</h2>
            <p>
              {tire.brand} — {tire.name}
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-bdy">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="mf" style={{ gridColumn: "span 2" }}>
              <label>Μοντέλο</label>
              <input value={tire.name} onChange={(e) => setEditTire((t) => ({ ...t, name: e.target.value }))} />
            </div>
            <div className="mf">
              <label>💰 Τιμή Σετ 4 (€)</label>
              <input
                type="number"
                value={tire.price}
                onChange={(e) => setEditTire((t) => ({ ...t, price: e.target.value }))}
              />
            </div>
            <div className="mf">
              <label>📦 Απόθεμα (τεμ.)</label>
              <input
                type="number"
                value={tire.stock}
                onChange={(e) => setEditTire((t) => ({ ...t, stock: e.target.value }))}
                min={0}
              />
            </div>
            <div className="mf">
              <label>🏷 Εποχή</label>
              <select value={tire.type} onChange={(e) => setEditTire((t) => ({ ...t, type: e.target.value }))}>
                {TYPES.map((tp) => (
                  <option key={tp}>{tp}</option>
                ))}
              </select>
            </div>
            <div className="mf">
              <label>🔊 Θόρυβος (dB)</label>
              <input
                type="number"
                value={tire.noise}
                onChange={(e) => setEditTire((t) => ({ ...t, noise: e.target.value }))}
                min={60}
                max={80}
              />
            </div>
            <div className="mf">
              <label>⛽ Ενέργεια</label>
              <select value={tire.fuel} onChange={(e) => setEditTire((t) => ({ ...t, fuel: e.target.value }))}>
                {FUELS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="mf">
              <label>💧 Υγρό</label>
              <select value={tire.wet} onChange={(e) => setEditTire((t) => ({ ...t, wet: e.target.value }))}>
                {WETS.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </div>
          </div>
          <div
            style={{
              marginTop: 16,
              padding: "12px 14px",
              background: "#0d0d0d",
              borderRadius: 8,
              border: "1px solid #1e1e1e",
              fontSize: 13,
              color: "#666",
            }}
          >
            📐 Διάσταση:{" "}
            <strong
              style={{
                color: "var(--accent)",
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 17,
                letterSpacing: 1,
              }}
            >
              {tire.width}/{tire.aspect} R{tire.rim}
            </strong>
            <span style={{ color: "#555" }}> · (Δεν μπορεί να αλλαχτεί)</span>
          </div>
        </div>
        <div className="modal-ftr">
          <button className="modal-discard" onClick={onClose}>
            Ακύρωση
          </button>
          <button className="modal-save" onClick={onSave}>
            💾 Αποθήκευση
          </button>
        </div>
      </div>
    </div>
  );
}

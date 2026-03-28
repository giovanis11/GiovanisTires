import { useRef, useState } from "react";
import { FUELS, TYPES, WETS } from "../../constants/appData";
import { optimizeImageFile } from "../../utils/imageUpload";

export default function EditTireModal({ tire, setEditTire, onClose, onSave, isSaving }) {
  const editImageInputRef = useRef(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  const handleEditImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !tire) return;

    setImageUploadError("");
    setIsUploadingImage(true);

    try {
      const { file: optimizedFile, previewUrl } = await optimizeImageFile(file);
      setEditTire((current) => ({
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
            <input
              ref={editImageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleEditImageUpload}
            />
            <button
              type="button"
              className="upload-zone"
              style={{ gridColumn: "span 2" }}
              onClick={() => editImageInputRef.current?.click()}
              disabled={isUploadingImage}
            >
              <div className="upload-zone-ico">📤</div>
              <p>{isUploadingImage ? "Γίνεται επεξεργασία εικόνας..." : "Ανέβασε νέα φωτογραφία από τη συσκευή"}</p>
              <span>JPG, PNG, WEBP · γίνεται αυτόματη βελτιστοποίηση</span>
            </button>
            {imageUploadError && (
              <div className="mf" style={{ gridColumn: "span 2", marginBottom: 0 }}>
                <span className="err-msg">⚠ {imageUploadError}</span>
              </div>
            )}
            {(tire.imagePreviewUrl || tire.imageUrl) && (
              <div className="product-image-preview" style={{ gridColumn: "span 2", maxWidth: "100%", marginBottom: 0 }}>
                <img src={tire.imagePreviewUrl || tire.imageUrl} alt={`${tire.brand} ${tire.name}`} loading="lazy" />
              </div>
            )}
            <div className="mf" style={{ gridColumn: "span 2" }}>
              <label>🖼 Εικόνα (URL, εναλλακτικά)</label>
              <input
                type="url"
                placeholder="https://example.com/tire.jpg ή /images/tire.jpg"
                value={tire.imageUrl || ""}
                onChange={(e) =>
                  setEditTire((current) => ({
                    ...current,
                    imageFile: null,
                    imagePreviewUrl: "",
                    imageUrl: e.target.value,
                  }))
                }
              />
              {(tire.imagePreviewUrl || tire.imageUrl) && (
                <button
                  type="button"
                  className="modal-discard"
                  onClick={() =>
                    setEditTire((current) => ({
                      ...current,
                      imageFile: null,
                      imagePreviewUrl: "",
                      imageUrl: "",
                    }))
                  }
                >
                  Αφαίρεση εικόνας
                </button>
              )}
            </div>
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
          <button className="modal-save" onClick={onSave} disabled={isSaving || isUploadingImage}>
            {isSaving ? "Αποθήκευση..." : "💾 Αποθήκευση"}
          </button>
        </div>
      </div>
    </div>
  );
}

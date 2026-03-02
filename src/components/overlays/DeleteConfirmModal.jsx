export default function DeleteConfirmModal({ tire, onClose, onDelete }) {
  if (!tire) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 440 }}>
        <div className="modal-hdr">
          <div>
            <h2>🗑 ΔΙΑΓΡΑΦΗ</h2>
            <p>Αυτή η ενέργεια δεν αναιρείται</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-bdy">
          <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.6 }}>
            Θέλετε σίγουρα να διαγράψετε το ελαστικό
            <br />
            <strong style={{ color: "var(--white)", fontSize: 16 }}>
              {tire.brand} — {tire.name}
            </strong>
            ?
          </p>
          <p style={{ marginTop: 12, fontSize: 13, color: "#555" }}>
            {tire.width}/{tire.aspect} R{tire.rim} · {tire.type}
          </p>
        </div>
        <div className="modal-ftr">
          <button className="modal-discard" onClick={onClose}>
            Ακύρωση
          </button>
          <button className="modal-delete" onClick={onDelete}>
            🗑 Ναι, Διαγραφή
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="toast">
      <span className="toast-ico">🛞</span>
      <div className="toast-msg">
        <strong>{toast.msg}</strong>
        {toast.sub && <span>{toast.sub}</span>}
      </div>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

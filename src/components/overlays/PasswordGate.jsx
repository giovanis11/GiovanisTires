export default function PasswordGate({
  show,
  authShake,
  passwordVisible,
  passwordValue,
  authError,
  isSubmitting,
  setPasswordVisible,
  setPasswordValue,
  handleSubmit,
  close,
}) {
  if (!show) return null;

  return (
    <div className="pw-overlay">
      <div className="pw-box">
        <div className="pw-icon">🔐</div>
        <h2>SUPABASE ADMIN</h2>
        <p>Βάλε το admin password για να μπεις στο διαχειριστικό panel.</p>
        <div className="pw-field">
          <input
            className={`pw-input ${authShake ? "err" : ""}`}
            type={passwordVisible ? "text" : "password"}
            placeholder="••••••••"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
            autoFocus
          />
          <button className="pw-toggle" onClick={() => setPasswordVisible((value) => !value)} type="button">
            {passwordVisible ? "🙈" : "👁"}
          </button>
        </div>
        <div className="pw-err">{authError}</div>
        <button className="pw-submit" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "ΣΥΝΔΕΣΗ..." : "ΕΙΣΟΔΟΣ →"}
        </button>
        <button className="pw-cancel" onClick={close} type="button">
          Ακύρωση
        </button>
      </div>
    </div>
  );
}

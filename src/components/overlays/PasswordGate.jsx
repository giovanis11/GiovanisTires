export default function PasswordGate({
  show,
  pwShake,
  pwVisible,
  pwValue,
  pwError,
  setPwVisible,
  setPwValue,
  setPwError,
  handlePwSubmit,
  close,
}) {
  if (!show) return null;

  return (
    <div className="pw-overlay">
      <div className="pw-box">
        <div className="pw-icon">🔐</div>
        <h2>ΔΙΑΧΕΙΡΙΣΗ</h2>
        <p>Εισάγετε τον κωδικό πρόσβασης για να μπείτε στο διαχειριστικό panel.</p>
        <div className="pw-field">
          <input
            className={`pw-input ${pwShake ? "err" : ""}`}
            type={pwVisible ? "text" : "password"}
            placeholder="••••"
            value={pwValue}
            onChange={(e) => {
              setPwValue(e.target.value);
              setPwError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handlePwSubmit()}
            autoFocus
          />
          <button className="pw-toggle" onClick={() => setPwVisible((v) => !v)}>
            {pwVisible ? "🙈" : "👁"}
          </button>
        </div>
        <div className="pw-err">{pwError}</div>
        <button className="pw-submit" onClick={handlePwSubmit}>
          ΕΙΣΟΔΟΣ →
        </button>
        <button className="pw-cancel" onClick={close}>
          Ακύρωση
        </button>
      </div>
    </div>
  );
}

export default function CheckOpt({ label, count, checked, onChange }) {
  return (
    <div className="fo" onClick={onChange}>
      <div className={`fo-box ${checked ? "chk" : ""}`}>{checked && <span className="fo-chk">✓</span>}</div>
      <span className="fo-lbl">{label}</span>
      <span className="fo-cnt">{count}</span>
    </div>
  );
}

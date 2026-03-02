import { useState } from "react";

export default function FilterGroup({ title, defaultOpen = false, count = 0, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="filter-group">
      <div className="fgh" onClick={() => setOpen((o) => !o)}>
        <span className="fgh-label">
          {title}
          {count > 0 && <span style={{ color: "var(--red)", marginLeft: 4 }}>·{count}</span>}
        </span>
        <span className={`fgh-arrow ${open ? "open" : ""}`}>▼</span>
      </div>
      {open && <div className="fgb">{children}</div>}
    </div>
  );
}

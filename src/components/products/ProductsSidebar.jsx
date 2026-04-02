import FilterGroup from "../filters/FilterGroup";
import CheckOpt from "../filters/CheckOpt";
import { FUELS, FUEL_COLORS, PRICE_FILTER_MAX, SPEEDS, TYPES, WETS, WET_COLORS } from "../../constants/appData";

export default function ProductsSidebar({
  brandSearch,
  setBrandSearch,
  filters,
  typeCounts,
  filtBrands,
  brandCounts,
  widthCounts,
  rimCounts,
  toggle,
  setFilters,
}) {
  return (
    <>
      <div className="sidebar-search">
        <input
          placeholder="🔍 Αναζήτηση μάρκας..."
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
        />
      </div>
      <FilterGroup title="Εποχή" defaultOpen count={filters.types.length}>
        {TYPES.map((t) => (
          <CheckOpt
            key={t}
            label={t}
            count={typeCounts[t] || 0}
            checked={filters.types.includes(t)}
            onChange={() => toggle("types", t)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Μάρκα" defaultOpen count={filters.brands.length}>
        {filtBrands.map((b) => (
          <CheckOpt
            key={b}
            label={b}
            count={brandCounts[b] || 0}
            checked={filters.brands.includes(b)}
            onChange={() => toggle("brands", b)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Τιμή Σετ 4 (€)" defaultOpen>
        <div className="price-display">
          <div className="price-val-box">{filters.priceMin}€</div>
          <div className="price-val-box">{filters.priceMax}€</div>
        </div>
        <div className="range-wrap">
          <div className="range-track-bg" />
          <div
            className="range-track-fill"
            style={{
              left: `${(filters.priceMin / PRICE_FILTER_MAX) * 100}%`,
              width: `${((filters.priceMax - filters.priceMin) / PRICE_FILTER_MAX) * 100}%`,
            }}
          />
          <input
            type="range"
            className="range-inp"
            min={0}
            max={PRICE_FILTER_MAX}
            step={5}
            value={filters.priceMin}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                priceMin: Math.min(+e.target.value, f.priceMax - 10),
              }))
            }
          />
          <input
            type="range"
            className="range-inp"
            min={0}
            max={PRICE_FILTER_MAX}
            step={5}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                priceMax: Math.max(+e.target.value, f.priceMin + 10),
              }))
            }
          />
        </div>
      </FilterGroup>
      <FilterGroup title="Πλάτος (mm)" count={filters.widths.length}>
        {["155", "205", "215", "225", "235", "245"].map((w) => (
          <CheckOpt
            key={w}
            label={`${w} mm`}
            count={widthCounts[w] || 0}
            checked={filters.widths.includes(w)}
            onChange={() => toggle("widths", w)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Ζάντα (ίντσες)" count={filters.rims.length}>
        {["16", "17", "18", "19"].map((r) => (
          <CheckOpt
            key={r}
            label={`R${r}`}
            count={rimCounts[r] || 0}
            checked={filters.rims.includes(r)}
            onChange={() => toggle("rims", r)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Ενέργεια" count={filters.fuel.length}>
        <div className="rating-hint">A = καλύτερη κλάση</div>
        <div className="rating-row">
          {FUELS.map((g) => (
            <button
              key={g}
              className={`r-btn ${filters.fuel.includes(g) ? "sel" : ""}`}
              style={
                filters.fuel.includes(g)
                  ? { background: FUEL_COLORS[g], borderColor: "transparent", color: "white" }
                  : {}
              }
              onClick={() => toggle("fuel", g)}
            >
              {g}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Πρόσφυση Υγρό" count={filters.wet.length}>
        <div className="rating-hint">A = καλύτερη πέδηση</div>
        <div className="rating-row">
          {WETS.map((g) => (
            <button
              key={g}
              className={`r-btn ${filters.wet.includes(g) ? "sel" : ""}`}
              style={
                filters.wet.includes(g)
                  ? { background: WET_COLORS[g], borderColor: "transparent", color: "white" }
                  : {}
              }
              onClick={() => toggle("wet", g)}
            >
              {g}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Ταχύτητα" count={filters.speed.length}>
        <div className="rating-row">
          {SPEEDS.map((g) => (
            <button
              key={g}
              className={`r-btn ${filters.speed.includes(g) ? "sel" : ""}`}
              style={
                filters.speed.includes(g)
                  ? { background: "var(--red)", borderColor: "transparent", color: "white" }
                  : {}
              }
              onClick={() => toggle("speed", g)}
            >
              {g}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Θόρυβος (dB)">
        <div className="noise-label">Μέγιστος: {filters.maxNoise} dB</div>
        <div className="range-wrap">
          <div className="range-track-bg" />
          <div
            className="range-track-fill"
            style={{ left: 0, width: `${((filters.maxNoise - 65) / 10) * 100}%` }}
          />
          <input
            type="range"
            className="range-inp"
            min={65}
            max={75}
            step={1}
            value={filters.maxNoise}
            onChange={(e) => setFilters((f) => ({ ...f, maxNoise: +e.target.value }))}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 10, color: "#555" }}>65</span>
          <span style={{ fontSize: 10, color: "#555" }}>75</span>
        </div>
      </FilterGroup>
    </>
  );
}

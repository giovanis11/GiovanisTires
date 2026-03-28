import { useEffect, useMemo, useState } from "react";
import { appStyle } from "./styles/appStyle";
import {
  BLANK,
  DASHBOARD_PASSWORD,
  getNextTireId,
  loadProductFormFromStorage,
  loadTiresFromStorage,
  PRODUCT_FORM_STORAGE_KEY,
  PRICE_FILTER_MAX,
  TIRES_STORAGE_KEY,
} from "./constants/appData";
import Header from "./components/layout/Header";
import PasswordGate from "./components/overlays/PasswordGate";
import Toast from "./components/overlays/Toast";
import DeleteConfirmModal from "./components/overlays/DeleteConfirmModal";
import EditTireModal from "./components/overlays/EditTireModal";
import ProductsSidebar from "./components/products/ProductsSidebar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [dashTab, setDashTab] = useState("overview");
  const [tires, setTires] = useState(() => loadTiresFromStorage());
  const [nextId, setNextId] = useState(() => getNextTireId(loadTiresFromStorage()));
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showPwGate, setShowPwGate] = useState(false);
  const [pwValue, setPwValue] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwVisible, setPwVisible] = useState(false);
  const [pwShake, setPwShake] = useState(false);
  const [dashUnlocked, setDashUnlocked] = useState(false);

  const [search, setSearch] = useState({ width: "", aspect: "", rim: "" });
  const [activeSearch, setActiveSearch] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [brandSearch, setBrandSearch] = useState("");
  const [filters, setFilters] = useState({
    brands: [],
    types: [],
    priceMin: 0,
    priceMax: PRICE_FILTER_MAX,
    widths: [],
    rims: [],
    fuel: [],
    wet: [],
    speed: [],
    maxNoise: 75,
  });

  const [form, setForm] = useState(() => loadProductFormFromStorage());
  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [editTire, setEditTire] = useState(null);
  const [delTire, setDelTire] = useState(null);
  const [invSearch, setInvSearch] = useState("");
  const [dimSearch, setDimSearch] = useState({ width: "", aspect: "", rim: "" });
  const [dimApplied, setDimApplied] = useState(null);
  const [openBrands, setOpenBrands] = useState({});

  const toggleBrand = (brand) => setOpenBrands((s) => ({ ...s, [brand]: !s[brand] }));
  const toggle = (key, value) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((x) => x !== value) : [...f[key], value],
    }));
  };
  const setF = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const showToast = (msg, sub = "") => {
    setToast({ msg, sub });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(TIRES_STORAGE_KEY, JSON.stringify(tires));
    } catch {
      // Ignore storage write failures (private mode/quota).
    }
  }, [tires]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PRODUCT_FORM_STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Ignore storage write failures (private mode/quota).
    }
  }, [form]);

  const handleDashClick = () => {
    if (dashUnlocked) {
      setPage("dashboard");
      setMenuOpen(false);
    } else {
      setShowPwGate(true);
      setPwValue("");
      setPwError("");
      setMenuOpen(false);
    }
  };

  const handlePwSubmit = () => {
    if (pwValue === DASHBOARD_PASSWORD) {
      setDashUnlocked(true);
      setShowPwGate(false);
      setPage("dashboard");
      setPwValue("");
      setPwError("");
    } else {
      setPwError("Λάθος κωδικός. Προσπαθήστε ξανά.");
      setPwShake(true);
      setTimeout(() => setPwShake(false), 400);
    }
  };

  const validate = () => {
    const errors = {};

    if (!form.brand.trim()) errors.brand = "Επιλέξτε μάρκα";
    if (!form.name.trim()) errors.name = "Πληκτρολογήστε μοντέλο";
    if (!form.width) errors.width = "Επιλέξτε πλάτος";
    if (!form.aspect) errors.aspect = "Επιλέξτε ύψος";
    if (!form.rim) errors.rim = "Επιλέξτε ζάντα";
    if (!form.type) errors.type = "Επιλέξτε εποχή";
    if (!form.price || Number.isNaN(+form.price) || +form.price <= 0) {
      errors.price = "Βάλτε τιμή σετ 4 ελαστικών σε €";
    }
    if (form.stock === "" || Number.isNaN(+form.stock) || +form.stock < 0) {
      errors.stock = "Βάλτε αριθμό αποθέματος";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    const tire = {
      ...form,
      id: nextId,
      price: +form.price,
      stock: +form.stock,
      noise: +form.noise,
      load: +form.load,
      imageUrl: form.imageUrl?.trim() || "",
    };

    setTires((ts) => [tire, ...ts]);
    setNextId((n) => n + 1);
    setForm(BLANK);
    setFormErrors({});
    showToast("✅ Προστέθηκε!", `${form.brand} ${form.name} · ${form.width}/${form.aspect} R${form.rim}`);
    setDashTab("inventory");
  };

  const handleEditSave = () => {
    setTires((ts) =>
      ts.map((x) =>
        x.id === editTire.id
          ? {
              ...editTire,
              price: +editTire.price,
              stock: +editTire.stock,
              noise: +editTire.noise,
              imageUrl: editTire.imageUrl?.trim() || "",
            }
          : x,
      ),
    );
    showToast("💾 Αποθηκεύτηκε!", `${editTire.brand} ${editTire.name}`);
    setEditTire(null);
  };

  const handleDelete = () => {
    setTires((ts) => ts.filter((x) => x.id !== delTire.id));
    showToast("🗑 Διαγράφηκε", delTire.name);
    setDelTire(null);
  };

  const filteredProducts = useMemo(() => {
    let list = tires.filter((t) => {
      if (activeSearch?.width && t.width !== activeSearch.width) return false;
      if (activeSearch?.aspect && t.aspect !== activeSearch.aspect) return false;
      if (activeSearch?.rim && t.rim !== activeSearch.rim) return false;
      if (filters.brands.length && !filters.brands.includes(t.brand)) return false;
      if (filters.types.length && !filters.types.includes(t.type)) return false;
      if (t.price < filters.priceMin || t.price > filters.priceMax) return false;
      if (filters.widths.length && !filters.widths.includes(t.width)) return false;
      if (filters.rims.length && !filters.rims.includes(t.rim)) return false;
      if (filters.fuel.length && !filters.fuel.includes(t.fuel)) return false;
      if (filters.wet.length && !filters.wet.includes(t.wet)) return false;
      if (filters.speed.length && !filters.speed.includes(t.speed)) return false;
      if (t.noise > filters.maxNoise) return false;
      return true;
    });

    if (sortBy === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [tires, activeSearch, filters, sortBy]);

  const brandCounts = useMemo(() => {
    const counts = {};
    tires.forEach((t) => {
      counts[t.brand] = (counts[t.brand] || 0) + 1;
    });
    return counts;
  }, [tires]);

  const typeCounts = useMemo(() => {
    const counts = {};
    tires.forEach((t) => {
      counts[t.type] = (counts[t.type] || 0) + 1;
    });
    return counts;
  }, [tires]);

  const widthCounts = useMemo(() => {
    const counts = {};
    tires.forEach((t) => {
      counts[t.width] = (counts[t.width] || 0) + 1;
    });
    return counts;
  }, [tires]);

  const rimCounts = useMemo(() => {
    const counts = {};
    tires.forEach((t) => {
      counts[t.rim] = (counts[t.rim] || 0) + 1;
    });
    return counts;
  }, [tires]);

  const chips = [];
  if (activeSearch?.width) chips.push({ label: `Πλάτος ${activeSearch.width}`, clear: () => setActiveSearch((s) => ({ ...s, width: "" })) });
  if (activeSearch?.aspect) chips.push({ label: `Ύψος ${activeSearch.aspect}`, clear: () => setActiveSearch((s) => ({ ...s, aspect: "" })) });
  if (activeSearch?.rim) chips.push({ label: `R${activeSearch.rim}`, clear: () => setActiveSearch((s) => ({ ...s, rim: "" })) });
  filters.brands.forEach((b) => chips.push({ label: b, clear: () => toggle("brands", b) }));
  filters.types.forEach((t) => chips.push({ label: t, clear: () => toggle("types", t) }));
  filters.widths.forEach((w) => chips.push({ label: `${w}mm`, clear: () => toggle("widths", w) }));
  filters.rims.forEach((r) => chips.push({ label: `R${r}`, clear: () => toggle("rims", r) }));
  filters.fuel.forEach((g) => chips.push({ label: `Καύσιμο ${g}`, clear: () => toggle("fuel", g) }));
  filters.wet.forEach((g) => chips.push({ label: `Υγρό ${g}`, clear: () => toggle("wet", g) }));
  filters.speed.forEach((g) => chips.push({ label: `Ταχ. ${g}`, clear: () => toggle("speed", g) }));
  if (filters.priceMin > 0 || filters.priceMax < PRICE_FILTER_MAX) {
    chips.push({
      label: `${filters.priceMin}€–${filters.priceMax}€`,
      clear: () => setFilters((f) => ({ ...f, priceMin: 0, priceMax: PRICE_FILTER_MAX })),
    });
  }
  if (filters.maxNoise < 75) {
    chips.push({ label: `≤${filters.maxNoise}dB`, clear: () => setFilters((f) => ({ ...f, maxNoise: 75 })) });
  }

  const clearAll = () => {
    setFilters({
      brands: [],
      types: [],
      priceMin: 0,
      priceMax: PRICE_FILTER_MAX,
      widths: [],
      rims: [],
      fuel: [],
      wet: [],
      speed: [],
      maxNoise: 75,
    });
    setActiveSearch(null);
  };

  const searchLabel = activeSearch
    ? [activeSearch.width, activeSearch.aspect, activeSearch.rim].filter(Boolean).join("/")
    : "";
  const filtBrands = [...new Set(tires.map((t) => t.brand))]
    .sort()
    .filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase()));

  const totalV = tires.reduce((s, t) => s + t.price * t.stock, 0);
  const outOfStk = tires.filter((t) => t.stock === 0).length;
  const lowStk = tires.filter((t) => t.stock > 0 && t.stock <= 3).length;
  const avgPrice = tires.length ? Math.round(tires.reduce((s, t) => s + t.price, 0) / tires.length) : 0;

  const brandBreakdown = useMemo(() => {
    const counts = {};
    tires.forEach((t) => {
      counts[t.brand] = (counts[t.brand] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
  }, [tires]);

  const maxBC = brandBreakdown[0]?.[1] || 1;

  const uniqueBrands = [...new Set(tires.map((t) => t.brand))].sort();
  const invFiltered = tires.filter((t) => {
    const textMatch =
      t.brand.toLowerCase().includes(invSearch.toLowerCase()) ||
      t.name.toLowerCase().includes(invSearch.toLowerCase());
    const dimMatch =
      !dimApplied ||
      ((!dimApplied.width || t.width === dimApplied.width) &&
        (!dimApplied.aspect || t.aspect === dimApplied.aspect) &&
        (!dimApplied.rim || t.rim === dimApplied.rim));
    return textMatch && dimMatch;
  });

  const filteredBrands = uniqueBrands.filter((b) => invFiltered.some((t) => t.brand === b));

  const formStep = useMemo(() => {
    if (form.brand && form.name) {
      if (form.width && form.aspect && form.rim && form.type && form.price && form.stock) return 3;
      return 2;
    }
    return 1;
  }, [form]);

  const SidebarContent = () => (
    <ProductsSidebar
      brandSearch={brandSearch}
      setBrandSearch={setBrandSearch}
      filters={filters}
      typeCounts={typeCounts}
      filtBrands={filtBrands}
      brandCounts={brandCounts}
      widthCounts={widthCounts}
      rimCounts={rimCounts}
      toggle={toggle}
      setFilters={setFilters}
    />
  );

  return (
    <>
      <style>{appStyle}</style>

      <PasswordGate
        show={showPwGate}
        pwShake={pwShake}
        pwVisible={pwVisible}
        pwValue={pwValue}
        pwError={pwError}
        setPwVisible={setPwVisible}
        setPwValue={setPwValue}
        setPwError={setPwError}
        handlePwSubmit={handlePwSubmit}
        close={() => {
          setShowPwGate(false);
          setPwValue("");
          setPwError("");
        }}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
      <DeleteConfirmModal tire={delTire} onClose={() => setDelTire(null)} onDelete={handleDelete} />
      <EditTireModal tire={editTire} setEditTire={setEditTire} onClose={() => setEditTire(null)} onSave={handleEditSave} />

      <Header
        page={page}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setPage={setPage}
        handleDashClick={handleDashClick}
      />

      {page === "home" && (
        <HomePage
          tiresLength={tires.length}
          search={search}
          setSearch={setSearch}
          setActiveSearch={setActiveSearch}
          setPage={setPage}
        />
      )}

      {page === "products" && (
        <ProductsPage
          searchLabel={searchLabel}
          setPage={setPage}
          chips={chips}
          filteredProducts={filteredProducts}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          renderSidebar={SidebarContent}
          viewMode={viewMode}
          setViewMode={setViewMode}
          clearAll={clearAll}
        />
      )}

      {page === "dashboard" && (
        <DashboardPage
          dashTab={dashTab}
          setDashTab={setDashTab}
          tires={tires}
          outOfStk={outOfStk}
          lowStk={lowStk}
          totalV={totalV}
          avgPrice={avgPrice}
          brandBreakdown={brandBreakdown}
          maxBC={maxBC}
          formStep={formStep}
          form={form}
          formErrors={formErrors}
          setF={setF}
          setForm={setForm}
          setFormErrors={setFormErrors}
          handleAdd={handleAdd}
          invSearch={invSearch}
          setInvSearch={setInvSearch}
          dimSearch={dimSearch}
          setDimSearch={setDimSearch}
          dimApplied={dimApplied}
          setDimApplied={setDimApplied}
          filteredBrands={filteredBrands}
          openBrands={openBrands}
          toggleBrand={toggleBrand}
          invFiltered={invFiltered}
          setEditTire={setEditTire}
          setDelTire={setDelTire}
        />
      )}
    </>
  );
}

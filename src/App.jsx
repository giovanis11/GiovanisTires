import { useEffect, useMemo, useState } from "react";
import { appStyle } from "./styles/appStyle";
import {
  BLANK,
  INITIAL_TIRES,
  loadProductFormFromStorage,
  PRICE_FILTER_MAX,
  PRODUCT_FORM_STORAGE_KEY,
  serializeProductForm,
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
import { isSupabaseConfigured } from "./lib/supabase";
import { createProduct, deleteProduct, listProducts, updateProduct, uploadProductImage } from "./lib/tireService";

const DASHBOARD_UNLOCK_KEY = "giovanis-tires.dashboard-unlocked";
const configuredAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "2003";
const normalizeRimValue = (value) => String(value ?? "").trim().replace(/^R/i, "");

const getErrorMessage = (error, fallback) => {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error && "message" in error && typeof error.message === "string") {
    return error.message;
  }

  return fallback;
};

const normalizeTireInput = (values, imageUrl) => ({
  brand: values.brand.trim(),
  name: values.name.trim(),
  width: values.width,
  aspect: values.aspect,
  rim: String(values.rim).replace(/^R/i, ""),
  type: values.type,
  price: Number(values.price),
  stock: Number(values.stock),
  fuel: values.fuel || "A",
  wet: values.wet || "A",
  noise: Number(values.noise) || 70,
  load: Number(values.load) || 91,
  speed: values.speed || "V",
  description: values.description?.trim() || "",
  imageUrl: imageUrl || "",
});

export default function App() {
  const [page, setPage] = useState("home");
  const [dashTab, setDashTab] = useState("overview");
  const [tires, setTires] = useState(() => (isSupabaseConfigured ? [] : INITIAL_TIRES));
  const [productsLoading, setProductsLoading] = useState(isSupabaseConfigured);
  const [dataError, setDataError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showPwGate, setShowPwGate] = useState(false);
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authShake, setAuthShake] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [dashboardUnlocked, setDashboardUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(DASHBOARD_UNLOCK_KEY) === "true";
  });

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
  const [isSaving, setIsSaving] = useState(false);
  const [invSearch, setInvSearch] = useState("");
  const [dimSearch, setDimSearch] = useState({ width: "", aspect: "", rim: "" });
  const [dimApplied, setDimApplied] = useState(null);
  const [openBrands, setOpenBrands] = useState({});

  const toggleBrand = (brand) => setOpenBrands((state) => ({ ...state, [brand]: !state[brand] }));
  const toggle = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  };
  const setF = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const showToast = (msg, sub = "") => {
    setToast({ msg, sub });
    window.setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(PRODUCT_FORM_STORAGE_KEY, JSON.stringify(serializeProductForm(form)));
    } catch {
      // Ignore storage write failures (private mode/quota).
    }
  }, [form]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (dashboardUnlocked) {
      window.sessionStorage.setItem(DASHBOARD_UNLOCK_KEY, "true");
      return;
    }

    window.sessionStorage.removeItem(DASHBOARD_UNLOCK_KEY);
  }, [dashboardUnlocked]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setProductsLoading(false);
      setTires(INITIAL_TIRES);
      setDataError("");
      return;
    }

    let isMounted = true;

    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        const items = await listProducts();
        if (!isMounted) return;

        setTires(items);
        setDataError("");
      } catch (error) {
        if (!isMounted) return;

        setTires([]);
        setDataError(
          getErrorMessage(error, "Το Supabase απάντησε με σφάλμα. Έλεγξε το schema, τα policies και τα env vars."),
        );
      } finally {
        if (isMounted) {
          setProductsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDashClick = () => {
    if (!isSupabaseConfigured) {
      showToast("Το dashboard θέλει Supabase", "Συμπλήρωσε πρώτα τα env vars και το schema.");
      setMenuOpen(false);
      return;
    }

    if (dashboardUnlocked) {
      setPage("dashboard");
      setMenuOpen(false);
      return;
    }

    setShowPwGate(true);
    setAuthError("");
    setAuthPassword("");
    setMenuOpen(false);
  };

  const handleAuthSubmit = async () => {
    if (!authPassword) {
      setAuthError("Συμπλήρωσε το password.");
      setAuthShake(true);
      window.setTimeout(() => setAuthShake(false), 400);
      return;
    }

    setAuthLoading(true);
    setAuthError("");

    try {
      if (authPassword !== configuredAdminPassword) {
        throw new Error("Λάθος password.");
      }

      setDashboardUnlocked(true);
      setShowPwGate(false);
      setPage("dashboard");
      setAuthPassword("");
      showToast("Συνδέθηκες επιτυχώς", "Το dashboard ξεκλείδωσε.");
    } catch (error) {
      setAuthError(getErrorMessage(error, "Απέτυχε η σύνδεση."));
      setAuthShake(true);
      window.setTimeout(() => setAuthShake(false), 400);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setDashboardUnlocked(false);
    setPage("home");
    showToast("Αποσυνδέθηκες", "Το dashboard έκλεισε.");
  };

  const validate = () => {
    const errors = {};

    if (!form.brand.trim()) errors.brand = "Επιλέξτε μάρκα";
    if (!form.name.trim()) errors.name = "Πληκτρολογήστε μοντέλο";
    if (!form.width) errors.width = "Επιλέξτε πλάτος";
    if (!form.aspect) errors.aspect = "Επιλέξτε ύψος";
    if (!form.rim) errors.rim = "Επιλέξτε ζάντα";
    if (!form.type) errors.type = "Επιλέξτε εποχή";
    if (!form.price || Number.isNaN(Number(form.price)) || Number(form.price) <= 0) {
      errors.price = "Βάλτε τιμή σετ 4 ελαστικών σε €";
    }
    if (form.stock === "" || Number.isNaN(Number(form.stock)) || Number(form.stock) < 0) {
      errors.stock = "Βάλτε αριθμό αποθέματος";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resolveImageUrl = async (values) => {
    if (!values.imageFile) {
      return values.imageUrl?.trim() || "";
    }

    return uploadProductImage({
      file: values.imageFile,
      brand: values.brand,
      name: values.name,
    });
  };

  const handleAdd = async () => {
    if (!validate()) return;
    if (!isSupabaseConfigured) {
      showToast("Το backend δεν είναι έτοιμο", "Βάλε Supabase env vars και τρέξε το schema.");
      return;
    }

    setIsSaving(true);

    try {
      const imageUrl = await resolveImageUrl(form);
      const payload = normalizeTireInput(form, imageUrl);
      const created = await createProduct(payload);

      setTires((items) => [created, ...items]);
      setForm(BLANK);
      setFormErrors({});
      setDashTab("inventory");
      showToast("✅ Προστέθηκε!", `${payload.brand} ${payload.name} · ${payload.width}/${payload.aspect} R${payload.rim}`);
    } catch (error) {
      showToast("Δεν αποθηκεύτηκε", getErrorMessage(error, "Απέτυχε η δημιουργία προϊόντος."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditSave = async () => {
    if (!editTire) return;

    setIsSaving(true);

    try {
      const imageUrl = await resolveImageUrl(editTire);
      const payload = normalizeTireInput(editTire, imageUrl);
      const updated = await updateProduct(editTire.id, payload);

      setTires((items) => items.map((item) => (item.id === updated.id ? updated : item)));
      showToast("💾 Αποθηκεύτηκε!", `${updated.brand} ${updated.name}`);
      setEditTire(null);
    } catch (error) {
      showToast("Δεν αποθηκεύτηκε", getErrorMessage(error, "Απέτυχε η ενημέρωση προϊόντος."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!delTire) return;

    setIsSaving(true);

    try {
      await deleteProduct(delTire.id);
      setTires((items) => items.filter((item) => item.id !== delTire.id));
      showToast("🗑 Διαγράφηκε", delTire.name);
      setDelTire(null);
    } catch (error) {
      showToast("Δεν διαγράφηκε", getErrorMessage(error, "Απέτυχε η διαγραφή προϊόντος."));
    } finally {
      setIsSaving(false);
    }
  };

  const normalizedActiveSearch = useMemo(() => {
    if (!activeSearch) return null;

    return {
      ...activeSearch,
      rim: normalizeRimValue(activeSearch.rim),
    };
  }, [activeSearch]);

  const filteredProducts = useMemo(() => {
    let list = tires.filter((tire) => {
      if (normalizedActiveSearch?.width && tire.width !== normalizedActiveSearch.width) return false;
      if (normalizedActiveSearch?.aspect && tire.aspect !== normalizedActiveSearch.aspect) return false;
      if (normalizedActiveSearch?.rim && tire.rim !== normalizedActiveSearch.rim) return false;
      if (filters.brands.length && !filters.brands.includes(tire.brand)) return false;
      if (filters.types.length && !filters.types.includes(tire.type)) return false;
      if (tire.price < filters.priceMin || tire.price > filters.priceMax) return false;
      if (filters.widths.length && !filters.widths.includes(tire.width)) return false;
      if (filters.rims.length && !filters.rims.includes(tire.rim)) return false;
      if (filters.fuel.length && !filters.fuel.includes(tire.fuel)) return false;
      if (filters.wet.length && !filters.wet.includes(tire.wet)) return false;
      if (filters.speed.length && !filters.speed.includes(tire.speed)) return false;
      if (tire.noise > filters.maxNoise) return false;
      return true;
    });

    if (sortBy === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [tires, normalizedActiveSearch, filters, sortBy]);

  const brandCounts = useMemo(() => {
    const counts = {};
    tires.forEach((tire) => {
      counts[tire.brand] = (counts[tire.brand] || 0) + 1;
    });
    return counts;
  }, [tires]);

  const typeCounts = useMemo(() => {
    const counts = {};
    tires.forEach((tire) => {
      counts[tire.type] = (counts[tire.type] || 0) + 1;
    });
    return counts;
  }, [tires]);

  const widthCounts = useMemo(() => {
    const counts = {};
    tires.forEach((tire) => {
      counts[tire.width] = (counts[tire.width] || 0) + 1;
    });
    return counts;
  }, [tires]);

  const rimCounts = useMemo(() => {
    const counts = {};
    tires.forEach((tire) => {
      counts[tire.rim] = (counts[tire.rim] || 0) + 1;
    });
    return counts;
  }, [tires]);

  const chips = [];
  if (normalizedActiveSearch?.width) chips.push({ label: `Πλάτος ${normalizedActiveSearch.width}`, clear: () => setActiveSearch((current) => ({ ...current, width: "" })) });
  if (normalizedActiveSearch?.aspect) chips.push({ label: `Ύψος ${normalizedActiveSearch.aspect}`, clear: () => setActiveSearch((current) => ({ ...current, aspect: "" })) });
  if (normalizedActiveSearch?.rim) chips.push({ label: `R${normalizedActiveSearch.rim}`, clear: () => setActiveSearch((current) => ({ ...current, rim: "" })) });
  filters.brands.forEach((brand) => chips.push({ label: brand, clear: () => toggle("brands", brand) }));
  filters.types.forEach((type) => chips.push({ label: type, clear: () => toggle("types", type) }));
  filters.widths.forEach((width) => chips.push({ label: `${width}mm`, clear: () => toggle("widths", width) }));
  filters.rims.forEach((rim) => chips.push({ label: `R${rim}`, clear: () => toggle("rims", rim) }));
  filters.fuel.forEach((fuel) => chips.push({ label: `Καύσιμο ${fuel}`, clear: () => toggle("fuel", fuel) }));
  filters.wet.forEach((wet) => chips.push({ label: `Υγρό ${wet}`, clear: () => toggle("wet", wet) }));
  filters.speed.forEach((speed) => chips.push({ label: `Ταχ. ${speed}`, clear: () => toggle("speed", speed) }));
  if (filters.priceMin > 0 || filters.priceMax < PRICE_FILTER_MAX) {
    chips.push({
      label: `${filters.priceMin}€–${filters.priceMax}€`,
      clear: () => setFilters((current) => ({ ...current, priceMin: 0, priceMax: PRICE_FILTER_MAX })),
    });
  }
  if (filters.maxNoise < 75) {
    chips.push({ label: `≤${filters.maxNoise}dB`, clear: () => setFilters((current) => ({ ...current, maxNoise: 75 })) });
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

  const searchLabel = normalizedActiveSearch
    ? [normalizedActiveSearch.width, normalizedActiveSearch.aspect, normalizedActiveSearch.rim].filter(Boolean).join("/")
    : "";
  const filtBrands = [...new Set(tires.map((tire) => tire.brand))]
    .sort()
    .filter((brand) => brand.toLowerCase().includes(brandSearch.toLowerCase()));

  const totalV = tires.reduce((sum, tire) => sum + tire.price * tire.stock, 0);
  const outOfStk = tires.filter((tire) => tire.stock === 0).length;
  const lowStk = tires.filter((tire) => tire.stock > 0 && tire.stock <= 3).length;
  const avgPrice = tires.length ? Math.round(tires.reduce((sum, tire) => sum + tire.price, 0) / tires.length) : 0;

  const brandBreakdown = useMemo(() => {
    const counts = {};
    tires.forEach((tire) => {
      counts[tire.brand] = (counts[tire.brand] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
  }, [tires]);

  const maxBC = brandBreakdown[0]?.[1] || 1;

  const uniqueBrands = [...new Set(tires.map((tire) => tire.brand))].sort();
  const invFiltered = tires.filter((tire) => {
    const textMatch =
      tire.brand.toLowerCase().includes(invSearch.toLowerCase()) ||
      tire.name.toLowerCase().includes(invSearch.toLowerCase());
    const dimMatch =
      !dimApplied ||
      ((!dimApplied.width || tire.width === dimApplied.width) &&
        (!dimApplied.aspect || tire.aspect === dimApplied.aspect) &&
        (!dimApplied.rim || tire.rim === dimApplied.rim));

    return textMatch && dimMatch;
  });

  const filteredBrands = uniqueBrands.filter((brand) => invFiltered.some((tire) => tire.brand === brand));

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
        authShake={authShake}
        passwordVisible={passwordVisible}
        passwordValue={authPassword}
        authError={authError}
        isSubmitting={authLoading}
        setPasswordVisible={setPasswordVisible}
        setPasswordValue={setAuthPassword}
        handleSubmit={handleAuthSubmit}
        close={() => {
          setShowPwGate(false);
          setAuthPassword("");
          setAuthError("");
        }}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
      <DeleteConfirmModal tire={delTire} onClose={() => setDelTire(null)} onDelete={handleDelete} />
      <EditTireModal
        tire={editTire}
        setEditTire={setEditTire}
        onClose={() => setEditTire(null)}
        onSave={handleEditSave}
        isSaving={isSaving}
      />

      <Header
        page={page}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setPage={setPage}
        handleDashClick={handleDashClick}
      />

      {!isSupabaseConfigured && (
        <div
          style={{
            margin: "18px 22px 0",
            padding: "14px 16px",
            background: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: 12,
            color: "#d4d4d4",
            fontSize: 14,
          }}
        >
          Demo mode: το site δείχνει sample προϊόντα τοπικά. Για live backend βάλε τα `VITE_SUPABASE_URL`,
          `VITE_SUPABASE_ANON_KEY` και τρέξε το SQL από τον φάκελο `supabase/`.
        </div>
      )}

      {page === "home" && (
        <HomePage
          tiresLength={tires.length}
          search={search}
          setSearch={setSearch}
          setActiveSearch={setActiveSearch}
          setPage={setPage}
          isLoading={productsLoading}
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
          isLoading={productsLoading}
          dataError={dataError}
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
          isSaving={isSaving}
          onSignOut={handleSignOut}
        />
      )}
    </>
  );
}

export const INITIAL_TIRES = [
  { id: "demo-1", brand: "Michelin", name: "Pilot Sport 5", width: "225", aspect: "45", rim: "17", type: "Καλοκαιρινό", price: 189, fuel: "A", wet: "A", noise: 70, load: 91, speed: "Y", stock: 12, description: "", imageUrl: "" },
  { id: "demo-2", brand: "Continental", name: "PremiumContact 7", width: "225", aspect: "45", rim: "17", type: "Καλοκαιρινό", price: 165, fuel: "B", wet: "A", noise: 71, load: 91, speed: "W", stock: 7, description: "", imageUrl: "" },
  { id: "demo-3", brand: "Bridgestone", name: "Turanza T005", width: "225", aspect: "45", rim: "17", type: "Καλοκαιρινό", price: 152, fuel: "B", wet: "B", noise: 72, load: 91, speed: "V", stock: 0, description: "", imageUrl: "" },
  { id: "demo-4", brand: "Pirelli", name: "P Zero", width: "225", aspect: "45", rim: "17", type: "Καλοκαιρινό", price: 210, fuel: "A", wet: "A", noise: 69, load: 94, speed: "Y", stock: 4, description: "", imageUrl: "" },
  { id: "demo-5", brand: "Goodyear", name: "Eagle F1 Asymmetric 6", width: "225", aspect: "45", rim: "17", type: "Καλοκαιρινό", price: 178, fuel: "A", wet: "A", noise: 70, load: 91, speed: "Y", stock: 19, description: "", imageUrl: "" },
  { id: "demo-6", brand: "Michelin", name: "Alpin 6", width: "205", aspect: "55", rim: "16", type: "Χειμερινό", price: 145, fuel: "C", wet: "B", noise: 70, load: 91, speed: "H", stock: 8, description: "", imageUrl: "" },
  { id: "demo-7", brand: "Continental", name: "WinterContact TS 870", width: "205", aspect: "55", rim: "16", type: "Χειμερινό", price: 138, fuel: "C", wet: "A", noise: 70, load: 91, speed: "T", stock: 3, description: "", imageUrl: "" },
  { id: "demo-8", brand: "Bridgestone", name: "Blizzak LM005", width: "205", aspect: "55", rim: "16", type: "Χειμερινό", price: 129, fuel: "D", wet: "A", noise: 71, load: 91, speed: "H", stock: 0, description: "", imageUrl: "" },
  { id: "demo-9", brand: "Pirelli", name: "Scorpion All Season+", width: "235", aspect: "60", rim: "18", type: "All Season", price: 198, fuel: "B", wet: "A", noise: 72, load: 107, speed: "V", stock: 6, description: "", imageUrl: "" },
  { id: "demo-10", brand: "Goodyear", name: "Vector 4Seasons Gen-3", width: "235", aspect: "60", rim: "18", type: "All Season", price: 185, fuel: "B", wet: "A", noise: 71, load: 107, speed: "V", stock: 11, description: "", imageUrl: "" },
  { id: "demo-11", brand: "Nokian", name: "Hakkapeliitta R5", width: "225", aspect: "50", rim: "17", type: "Χειμερινό", price: 178, fuel: "D", wet: "A", noise: 70, load: 98, speed: "R", stock: 2, description: "", imageUrl: "" },
  { id: "demo-12", brand: "Hankook", name: "Ventus S1 evo3", width: "245", aspect: "40", rim: "19", type: "Καλοκαιρινό", price: 155, fuel: "B", wet: "A", noise: 70, load: 98, speed: "Y", stock: 14, description: "", imageUrl: "" },
  { id: "demo-13", brand: "Dunlop", name: "Sport Maxx RT2", width: "245", aspect: "45", rim: "18", type: "Καλοκαιρινό", price: 142, fuel: "C", wet: "B", noise: 71, load: 100, speed: "Y", stock: 5, description: "", imageUrl: "" },
  { id: "demo-14", brand: "Falken", name: "Azenis FK520", width: "215", aspect: "55", rim: "17", type: "Καλοκαιρινό", price: 99, fuel: "B", wet: "A", noise: 70, load: 98, speed: "W", stock: 9, description: "", imageUrl: "" },
  { id: "demo-15", brand: "Michelin", name: "CrossClimate 2", width: "215", aspect: "55", rim: "17", type: "All Season", price: 162, fuel: "B", wet: "A", noise: 69, load: 98, speed: "V", stock: 16, description: "", imageUrl: "" },
  { id: "demo-16", brand: "Toyo", name: "Proxes Sport", width: "235", aspect: "45", rim: "18", type: "Καλοκαιρινό", price: 132, fuel: "C", wet: "B", noise: 72, load: 98, speed: "Y", stock: 1, description: "", imageUrl: "" },
  { id: "demo-17", brand: "Continental", name: "AllSeasonContact 2", width: "215", aspect: "55", rim: "17", type: "All Season", price: 148, fuel: "C", wet: "A", noise: 71, load: 98, speed: "V", stock: 22, description: "", imageUrl: "" },
  { id: "demo-18", brand: "Nokian", name: "Snowproof P", width: "235", aspect: "60", rim: "18", type: "Χειμερινό", price: 167, fuel: "C", wet: "A", noise: 72, load: 107, speed: "V", stock: 0, description: "", imageUrl: "" },
];

export const BRAND_ICONS = { Michelin: "🇫🇷", Continental: "🇩🇪", Bridgestone: "🇯🇵", Pirelli: "🇮🇹", Goodyear: "🇺🇸", Nokian: "🇫🇮", Hankook: "🇰🇷", Dunlop: "🇬🇧", Falken: "🇯🇵", Toyo: "🇯🇵" };
export const WIDTHS = ["175", "185", "195", "205", "215", "225", "235", "245", "255", "265", "275", "285", "295", "305"];
export const ASPECTS = ["35", "40", "45", "50", "55", "60", "65", "70", "75", "80"];
export const RIMS = ["14", "15", "16", "17", "18", "19", "20", "21", "22"];
export const TYPES = ["Καλοκαιρινό", "Χειμερινό", "All Season"];
export const BRANDS_LIST = ["Michelin", "Continental", "Bridgestone", "Pirelli", "Goodyear", "Nokian", "Hankook", "Dunlop", "Falken", "Toyo", "Kumho", "Yokohama", "Vredestein", "BFGoodrich", "Cooper", "Άλλη μάρκα"];
export const FUELS = ["A", "B", "C", "D", "E"];
export const WETS = ["A", "B", "C", "D", "E"];
export const SPEEDS = ["R", "H", "T", "V", "W", "Y"];
export const FUEL_COLORS = { A: "#166534", B: "#15803d", C: "#92400e", D: "#991b1b", E: "#7f1d1d" };
export const WET_COLORS = { A: "#1e40af", B: "#1d4ed8", C: "#7e22ce", D: "#9d174d", E: "#7f1d1d" };

export const BLANK = {
  brand: "",
  name: "",
  width: "",
  aspect: "",
  rim: "",
  type: "",
  price: "",
  stock: "",
  fuel: "A",
  wet: "A",
  noise: "70",
  load: "91",
  speed: "V",
  description: "",
  imageUrl: "",
  imageFile: null,
  imagePreviewUrl: "",
};

export const PRODUCT_FORM_STORAGE_KEY = "giovanis-tires.product-form.v1";
export const CUSTOM_BRANDS_STORAGE_KEY = "giovanis-tires.custom-brands.v1";
export const PRICE_FILTER_MAX = 2000;
const compareBrands = (a, b) => a.localeCompare(b, "el", { sensitivity: "base" });
const normalizeBrand = (brand) => String(brand ?? "").trim();
const uniqueBrands = (brands) => {
  const list = [];

  brands.forEach((brand) => {
    const normalized = normalizeBrand(brand);
    if (!normalized) return;
    if (list.some((item) => compareBrands(item, normalized) === 0)) return;
    list.push(normalized);
  });

  return list.sort(compareBrands);
};

export const serializeProductForm = (form) => ({
  ...BLANK,
  ...form,
  imageFile: null,
  imagePreviewUrl: "",
});

export const loadProductFormFromStorage = () => {
  if (typeof window === "undefined") return BLANK;

  try {
    const raw = window.localStorage.getItem(PRODUCT_FORM_STORAGE_KEY);
    if (!raw) return BLANK;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return BLANK;

    return { ...BLANK, ...parsed, imageFile: null, imagePreviewUrl: "" };
  } catch {
    return BLANK;
  }
};

export const loadCustomBrandsFromStorage = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CUSTOM_BRANDS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return uniqueBrands(parsed).filter(
      (brand) => !BRANDS_LIST.some((existingBrand) => compareBrands(existingBrand, brand) === 0),
    );
  } catch {
    return [];
  }
};

export const addCustomBrandToStorage = (brand) => {
  const normalizedBrand = normalizeBrand(brand);
  if (!normalizedBrand) return loadCustomBrandsFromStorage();
  if (BRANDS_LIST.some((existingBrand) => compareBrands(existingBrand, normalizedBrand) === 0)) {
    return loadCustomBrandsFromStorage();
  }

  const nextBrands = uniqueBrands([...loadCustomBrandsFromStorage(), normalizedBrand]);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(CUSTOM_BRANDS_STORAGE_KEY, JSON.stringify(nextBrands));
  }

  return nextBrands;
};

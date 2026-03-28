import { INITIAL_TIRES } from "../constants/appData";
import { isSupabaseConfigured, supabase, SUPABASE_STORAGE_BUCKET } from "./supabase";

const slugify = (value) => {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const slug = normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "tire";
};

const mapRowToTire = (row) => ({
  id: row.id,
  brand: row.brand,
  name: row.name,
  width: row.width,
  aspect: row.aspect,
  rim: row.rim,
  type: row.type,
  price: Number(row.price) || 0,
  stock: Number(row.stock) || 0,
  fuel: row.fuel || "A",
  wet: row.wet || "A",
  noise: Number(row.noise) || 70,
  load: Number(row.load) || 91,
  speed: row.speed || "V",
  description: row.description || "",
  imageUrl: row.image_url || "",
});

const mapTireToRow = (tire) => ({
  brand: tire.brand,
  name: tire.name,
  width: tire.width,
  aspect: tire.aspect,
  rim: tire.rim,
  type: tire.type,
  price: tire.price,
  stock: tire.stock,
  fuel: tire.fuel,
  wet: tire.wet,
  noise: tire.noise,
  load: tire.load,
  speed: tire.speed,
  description: tire.description,
  image_url: tire.imageUrl,
});

export const getDemoProducts = () => INITIAL_TIRES;

export const listProducts = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return getDemoProducts();
  }

  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) throw error;

  return data.map(mapRowToTire);
};

export const createProduct = async (product) => {
  if (!supabase) {
    throw new Error("Το Supabase δεν έχει ρυθμιστεί.");
  }

  const { data, error } = await supabase.from("products").insert([mapTireToRow(product)]).select().single();
  if (error) throw error;

  return mapRowToTire(data);
};

export const updateProduct = async (id, product) => {
  if (!supabase) {
    throw new Error("Το Supabase δεν έχει ρυθμιστεί.");
  }

  const { data, error } = await supabase.from("products").update(mapTireToRow(product)).eq("id", id).select().single();
  if (error) throw error;

  return mapRowToTire(data);
};

export const deleteProduct = async (id) => {
  if (!supabase) {
    throw new Error("Το Supabase δεν έχει ρυθμιστεί.");
  }

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
};

export const uploadProductImage = async ({ file, brand, name }) => {
  if (!supabase) {
    throw new Error("Το Supabase δεν έχει ρυθμιστεί.");
  }

  const extension = file.name.split(".").pop() || "webp";
  const objectPath = `public/${Date.now()}-${slugify(`${brand}-${name}`)}.${extension}`;

  const { error } = await supabase.storage.from(SUPABASE_STORAGE_BUCKET).upload(objectPath, file, {
    cacheControl: "3600",
    contentType: file.type || "image/webp",
    upsert: false,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(objectPath);

  return publicUrl;
};

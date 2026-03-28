import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const placeholderPatterns = [/your-project-ref/i, /your-anon-key/i, /changeme/i];

const hasUsableEnvValue = (value, { isUrl = false } = {}) => {
  if (typeof value !== "string") return false;

  const trimmed = value.trim();
  if (!trimmed) return false;
  if (placeholderPatterns.some((pattern) => pattern.test(trimmed))) return false;

  if (!isUrl) return true;

  try {
    new URL(trimmed);
    return true;
  } catch {
    return false;
  }
};

export const SUPABASE_STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "tire-images";
export const isSupabaseConfigured = hasUsableEnvValue(supabaseUrl, { isUrl: true }) && hasUsableEnvValue(supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    })
  : null;

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const TARGET_OUTPUT_BYTES = 450 * 1024;
const MIN_QUALITY = 0.55;
const QUALITY_STEP = 0.08;

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Δεν διαβάστηκε η εικόνα."));
    reader.readAsDataURL(file);
  });

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Η εικόνα δεν είναι έγκυρη."));
    image.src = src;
  });

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Αποτυχία επεξεργασίας εικόνας."));
        return;
      }

      resolve(blob);
    }, type, quality);
  });

const getOptimizedFileName = (name = "tire") => {
  const baseName = name.replace(/\.[^.]+$/, "").trim() || "tire";
  const safeName = baseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return `${safeName || "tire"}.webp`;
};

export const optimizeImageFile = async (file) => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Το αρχείο πρέπει να είναι εικόνα.");
  }

  if (file.size > MAX_FILE_BYTES) {
    throw new Error("Η εικόνα είναι πολύ μεγάλη. Μέγιστο: 8MB.");
  }

  const originalDataUrl = await readAsDataUrl(file);
  const image = await loadImage(originalDataUrl);

  const maxWidth = 1200;
  const maxHeight = 1200;
  const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Αποτυχία επεξεργασίας εικόνας.");
  }

  context.drawImage(image, 0, 0, width, height);

  let quality = 0.85;
  let blob = await canvasToBlob(canvas, "image/webp", quality);

  while (blob.size > TARGET_OUTPUT_BYTES && quality > MIN_QUALITY) {
    quality = Math.max(MIN_QUALITY, quality - QUALITY_STEP);
    blob = await canvasToBlob(canvas, "image/webp", quality);
  }

  const optimizedFile = new File([blob], getOptimizedFileName(file.name), {
    type: "image/webp",
    lastModified: Date.now(),
  });

  return {
    bytes: optimizedFile.size,
    file: optimizedFile,
    previewUrl: URL.createObjectURL(optimizedFile),
  };
};

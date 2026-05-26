export const SITE_URL = "https://PASTE_DOMAIN_HERE.gr";
export const BUSINESS_NAME = "Ελαστικά Γιοβάνης";
export const BUSINESS_LEGAL_NAME = "Βουλκανιζατέρ Γιοβάνης Θοδωρής";
export const BUSINESS_PHONE = "+302109015391";
export const BUSINESS_DISPLAY_PHONE = "210 9015391";
export const BUSINESS_EMAIL = "shozhos@gmail.com";
export const BUSINESS_ADDRESS = {
  streetAddress: "Κάρπου 22",
  addressLocality: "Αθήνα",
  postalCode: "11631",
  addressCountry: "GR",
};
export const BUSINESS_GEO = {
  latitude: 37.958283,
  longitude: 23.736241,
};
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const pageUrls = {
  home: `${SITE_URL}/`,
  products: `${SITE_URL}/products`,
  dashboard: `${SITE_URL}/`,
};

export const seoPages = {
  home: {
    title: `Αρχική | ${BUSINESS_NAME} - Ελαστικά Αθήνα`,
    description:
      "Ελαστικά Αθήνα στο Βουλκανιζατέρ Γιοβάνης Θοδωρής. Αλλαγή ελαστικών, ζυγοστάθμιση και συνεργείο ελαστικών στην Κάρπου 22 για λάστιχα αυτοκινήτου.",
    canonicalUrl: pageUrls.home,
    imageUrl: DEFAULT_OG_IMAGE,
  },
  products: {
    title: `Προϊόντα | ${BUSINESS_NAME} - Ελαστικά Αθήνα`,
    description:
      "Βρείτε λάστιχα αυτοκινήτου στην Αθήνα ανά διάσταση, μάρκα και εποχή. Κατάλογος ελαστικών, αλλαγή ελαστικών και επαγγελματική τοποθέτηση.",
    canonicalUrl: pageUrls.products,
    imageUrl: DEFAULT_OG_IMAGE,
  },
  dashboard: {
    title: `Διαχείριση | ${BUSINESS_NAME} - Ελαστικά Αθήνα`,
    description:
      "Προστατευμένη διαχείριση καταλόγου για το συνεργείο ελαστικών Ελαστικά Γιοβάνης στην Αθήνα.",
    canonicalUrl: pageUrls.dashboard,
    imageUrl: DEFAULT_OG_IMAGE,
  },
};

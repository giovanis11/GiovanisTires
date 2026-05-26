import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import { ASPECTS, RIMS, WIDTHS } from "../constants/appData";
import {
  BUSINESS_ADDRESS,
  BUSINESS_DISPLAY_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_GEO,
  BUSINESS_LEGAL_NAME,
  BUSINESS_PHONE,
  pageUrls,
  seoPages,
} from "../constants/seoData";

export default function HomePage({ tiresLength, search, setSearch, setActiveSearch, setPage, isLoading }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: BUSINESS_LEGAL_NAME,
    url: pageUrls.home,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    openingHours: ["Mo-Fr 08:00-18:00", "Sa 08:00-14:00"],
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    priceRange: "€€",
    areaServed: "Athens",
    sameAs: [],
  };

  return (
    <>
      <SEO {...seoPages.home} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <section className="hero">
        <div className="hero-bg" />
        <div className="tire-ring" />
        <div className="hero-content">
          <div className="badge">🏎 ΕΜΠΟΡΙΟ & SERVICE από το 1998</div>
          <h1>
            ΒΟΥΛΚΑΝΙΖΑΤΕΡ
            <br />
            <span className="hero-name">
              <em>ΓΙΟΒΑΝΗΣ</em>
              <span className="hero-subname">ΘΟΔΩΡΗΣ</span>
            </span>
          </h1>
          <p>
            Βρείτε το ιδανικό ελαστικό για το όχημά σας. Τεράστια επιλογή από τις κορυφαίες
            μάρκες, σε ανταγωνιστικές τιμές.
          </p>
          <div className="search-card">
            <h2>🔍 Αναζήτηση με διαστάσεις ελαστικού</h2>
            <div className="search-row">
              <div className="field">
                <label>Πλάτος (mm)</label>
                <select value={search.width} onChange={(e) => setSearch((s) => ({ ...s, width: e.target.value }))}>
                  <option value="">π.χ. 225</option>
                  {WIDTHS.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Σχέση ύψους (%)</label>
                <select
                  value={search.aspect}
                  onChange={(e) => setSearch((s) => ({ ...s, aspect: e.target.value }))}
                >
                  <option value="">π.χ. 45</option>
                  {ASPECTS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Διάμετρος (ίντσες)</label>
                <select value={search.rim} onChange={(e) => setSearch((s) => ({ ...s, rim: e.target.value }))}>
                  <option value="">π.χ. 17</option>
                  {RIMS.map((r) => (
                    <option key={r} value={r}>
                      R{r}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="search-btn"
                onClick={() => {
                  setActiveSearch({ ...search, rim: search.rim.replace(/^R/i, "") });
                  setPage("products");
                }}
              >
                ΑΝΑΖΗΤΗΣΗ
              </button>
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-num">{isLoading ? "..." : `${tiresLength}+`}</div>
            <div className="stat-label">Προϊόντα</div>
          </div>
          <div className="stat">
            <div className="stat-num">15+</div>
            <div className="stat-label">Μάρκες</div>
          </div>
          <div className="stat">
            <div className="stat-num">10ΩΡΟ</div>
            <div className="stat-label">Εξυπηρέτηση</div>
          </div>
          <div className="stat">
            <div className="stat-num">25+</div>
            <div className="stat-label">Χρόνια</div>
          </div>
        </div>
      </section>

      <section className="brands-section">
        <h2>Συνεργαζόμαστε με</h2>
        <div className="brands-row">
          {["MICHELIN", "CONTINENTAL", "BRIDGESTONE", "PIRELLI", "GOODYEAR", "NOKIAN", "HANKOOK"].map(
            (b) => (
              <div key={b} className="brand-name-s">
                {b}
              </div>
            ),
          )}
        </div>
      </section>

      <section className="why-section">
        <div className="sec-header">
          <div className="eyebrow">Γιατί Εμάς</div>
          <h2>
            ΕΜΠΙΣΤΟΣΥΝΗ ΠΟΥ
            <br />
            ΚΡΑΤΑ ΔΕΚΑΕΤΙΕΣ
          </h2>
          <p>
            Από το 1998 εξυπηρετούμε χιλιάδες πελάτες σε όλη την Ελλάδα με επαγγελματισμό και
            γνώση.
          </p>
        </div>
        <div className="why-grid">
          {[
            {
              icon: "🏆",
              title: "25 Χρόνια Εμπειρίας",
              text: "Δεκαετίες εξειδίκευσης στον κλάδο ελαστικών. Γνωρίζουμε κάθε μάρκα, κάθε μοντέλο, κάθε εποχή.",
            },
            {
              icon: "💰",
              title: "Ανταγωνιστικές Τιμές",
              text: "Άμεσες συμφωνίες με τους κατασκευαστές μας επιτρέπουν να σας δίνουμε τις καλύτερες τιμές της αγοράς.",
            },
            {
              icon: "🚗",
              title: "Δωρεάν Τοποθέτηση",
              text: "Αγοράστε ελαστικά και η τοποθέτηση στο κατάστημά μας είναι εντελώς δωρεάν.",
            },
            {
              icon: "🔧",
              title: "Επαγγελματικό Συνεργείο",
              text: "Εξοπλισμένο συνεργείο με τελευταίας τεχνολογίας μηχανήματα ζυγοστάθμισης και τοποθέτησης.",
            },
            {
              icon: "📦",
              title: "Άμεση Διαθεσιμότητα",
              text: "Τεράστια αποθήκη με εκατοντάδες μοντέλα σε stock. Παραλαβή ίδια μέρα για τα περισσότερα.",
            },
            {
              icon: "⭐",
              title: "Εγγύηση Ικανοποίησης",
              text: "Αν δεν είστε ικανοποιημένοι, βρίσκουμε λύση. Πάντα. Γιατί ο πελάτης μας είναι το παν.",
            },
          ].map((c, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-section" id="services-section">
        <div className="sec-header">
          <div className="eyebrow">Υπηρεσίες</div>
          <h2>ΟΛΑ ΟΣΑ ΧΡΕΙΑΖΕΣΤΕ</h2>
        </div>
        <div className="services-grid">
          {[
            {
              icon: "🛞",
              title: "Πώληση Ελαστικών",
              text: "Τεράστια γκάμα ελαστικών από τις κορυφαίες μάρκες. Καλοκαιρινά, χειμερινά και all season σε όλες τις διαστάσεις.",
            },
            {
              icon: "⚖️",
              title: "Ζυγοστάθμιση Τροχών",
              text: "Επαγγελματική ζυγοστάθμιση με σύγχρονα μηχανήματα για ομαλή οδήγηση και μεγαλύτερη διάρκεια ελαστικών.",
            },
            {
              icon: "🔄",
              title: "Εποχιακή Αλλαγή",
              text: "Αποθηκεύστε τα ελαστικά σας εκτός εποχής στις κλιματιζόμενες αποθήκες μας. Ασφαλής φύλαξη ολόχρονα.",
            },
            {
              icon: "🩺",
              title: "Εκτίμηση & Συμβουλές",
              text: "Δωρεάν εκτίμηση κατάστασης ελαστικών και αμερόληπτες συμβουλές για την ιδανική επιλογή για το όχημά σας.",
            },
          ].map((s, i) => (
            <div key={i} className="service-card">
              <div className="svc-icon">{s.icon}</div>
              <div className="svc-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews-section">
        <div className="sec-header">
          <div className="eyebrow">Κριτικές Πελατών</div>
          <h2>ΤΙ ΛΕΝΕ ΟΙ ΠΕΛΑΤΕΣ ΜΑΣ</h2>
        </div>
        <div className="reviews-grid">
          {[
            {
              stars: "★★★★★",
              text: "Εξαιρετική εξυπηρέτηση! Βρήκα αμέσως αυτό που ήθελα για το BMW μου σε πολύ καλή τιμή. Θα επιστρέψω σίγουρα.",
              name: "Νίκος Π.",
              car: "BMW 320i",
            },
            {
              stars: "★★★★★",
              text: "Επαγγελματισμός σε κάθε επίπεδο. Με βοήθησαν να επιλέξω τα σωστά χειμερινά ελαστικά για τις συνθήκες του βουνού.",
              name: "Μαρία Κ.",
              car: "Toyota RAV4",
            },
            {
              stars: "★★★★★",
              text: "Τιμές που δεν βρίσκεις αλλού! Πήρα 4 Michelin Pilot Sport και τοποθετήθηκαν την ίδια μέρα. Άψογη δουλειά!",
              name: "Σταύρος Α.",
              car: "Audi A4",
            },
          ].map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">{r.stars}</div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-author">
                <div className="review-avatar">{r.name[0]}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-car">{r.car}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-strip">
        <h2>
          ΕΤΟΙΜΟΙ ΓΙΑ ΝΕΑ
          <br />
          ΕΛΑΣΤΙΚΑ;
        </h2>
        <p>
          Αναζητήστε τώρα από τον κατάλογό μας ή επικοινωνήστε μαζί μας για προσωπική
          εξυπηρέτηση.
        </p>
        <div className="cta-btn-row">
          <button className="cta-primary" onClick={() => setPage("products")}>
            ΔΕΙΤΕ ΤΟΝ ΚΑΤΑΛΟΓΟ
          </button>
          <button
            className="cta-secondary"
            onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Επικοινωνία
          </button>
        </div>
      </section>

      <section className="contact-section" id="contact-section">
        <div className="sec-header">
          <div className="eyebrow">Επικοινωνία</div>
          <h2>ΒΡΕΙΤΕ ΜΑΣ</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            {[
              {
                icon: "📍",
                title: "Διεύθυνση",
                text: "Κάρπου 22, Αθήνα 11631",
              },
              { icon: "📞", title: "Τηλέφωνο", text: "210 9015391\nΔευτ–Σάβ: 08:00–18:00" },
              { icon: "✉️", title: "Email", text: "shozhos@gmail.com" },
              {
                icon: "🕐",
                title: "Ωράριο",
                text: "Δευτέρα–Παρασκευή: 08:00–18:00\nΣάββατο: 08:00–14:00",
              },
            ].map((c, i) => (
              <div key={i} className="contact-item">
                <div className="contact-ico">{c.icon}</div>
                <div className="contact-detail">
                  <h3>{c.title}</h3>
                  <p style={{ whiteSpace: "pre-line" }}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="contact-map-card">
            <div className="contact-map-head">
              <h3>📍 Τοποθεσία Καταστήματος</h3>
              <a
                className="contact-map-link"
                href="https://www.google.com/maps?ll=37.958283,23.736241&z=16&t=m&hl=el&gl=GR&mapclient=embed&cid=6139991713258396512"
                target="_blank"
                rel="noreferrer"
              >
                Άνοιγμα Χάρτη
              </a>
            </div>
            <iframe
              className="contact-map-frame"
              title="Χάρτης καταστήματος"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.807412140295!2d23.733666176028784!3d37.95828257193969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd0c5e4f2253%3A0x5535a1eea09bdb60!2zzqDOlc6kzqTOkc6jIM6azqnOnc6jzqTOkc6dzqTOmc6dzp_Oow!5e0!3m2!1sel!2sgr!4v1771877981590!5m2!1sel!2sgr"
            />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ cursor: "default", fontSize: 18 }}>
              ΕΛΑΣΤΙΚΑ <span style={{ color: "var(--red)" }}>ΓΙΟΒΑΝΗΣ</span>
              <small
                style={{
                  display: "block",
                  fontFamily: "Outfit",
                  fontSize: 9,
                  letterSpacing: 3,
                  color: "var(--gray-light)",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Επαγγελματικά Ελαστικά
              </small>
            </div>
            <p>
              Από το 1998 προσφέρουμε αξιόπιστα ελαστικά και επαγγελματική εξυπηρέτηση σε όλη την
              Ελλάδα.
            </p>
          </div>
          <div className="footer-col">
            <p className="footer-heading">Πλοήγηση</p>
            <button type="button" onClick={() => setPage("home")}>Αρχική</button>
            <button type="button" onClick={() => setPage("products")}>Προϊόντα</button>
            <button type="button" onClick={() => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" })}>
              Υπηρεσίες
            </button>
            <button type="button" onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}>
              Επικοινωνία
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2025 Ελαστικά Γιοβάνης. Όλα τα δικαιώματα διατηρούνται.</span>
          <span className="footer-made">Αθήνα, Ελλάδα · {BUSINESS_DISPLAY_PHONE}</span>
        </div>
      </footer>
    </>
  );
}

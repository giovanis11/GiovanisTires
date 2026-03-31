export const appStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --black:#0a0a0a; --red:#e8192c; --red-dark:#b50f1e; --red-soft:#fff1f2;
    --white:#f5f5f0; --gray:#141414; --gray-light:#777; --border:#222;
    --sidebar-bg:#0e0e0e; --accent:#f0c040;
    --green:#16a34a; --green-light:#dcfce7; --green-bg:#052e16;
    --blue:#3b82f6; --orange:#f97316; --orange-bg:#431407;
    --top-strip-height:34px;
    --header-stack:96px;
  }
  html, body, #root {
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  body { background:var(--black); color:var(--white); font-family:'Outfit',sans-serif; min-height:100vh; display:block; }

  /* ── NAV ── */
  .top-contact-bar {
    position:fixed; top:0; left:0; right:0; z-index:210;
    height:var(--top-strip-height); display:flex; align-items:center; justify-content:center; gap:10px;
    padding:0 18px; background:#060606; border-bottom:1px solid #171717;
    font-size:14px; letter-spacing:.6px; color:#b4b4b4;
  }
  .top-contact-bar a {
    color:var(--white); font-size:15px; font-weight:700; text-decoration:none; transition:color .2s;
  }
  .top-contact-bar a:hover { color:var(--red-soft); }
  .nav {
    position:fixed; top:var(--top-strip-height); left:0; right:0; z-index:200;
    display:flex; align-items:center; justify-content:space-between;
    padding:14px 36px;
    background:rgba(10,10,10,.97); backdrop-filter:blur(12px);
    border-bottom:1px solid var(--border);
  }
  .logo { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:2px; cursor:pointer; user-select:none; line-height:1.1; }
  .logo small { display:block; font-family:'Outfit',sans-serif; font-size:9px; letter-spacing:3px; color:var(--gray-light); text-transform:uppercase; font-weight:500; }
  .logo span { color:var(--red); }
  .nav-links { display:flex; gap:24px; align-items:center; }
  .nav-links a { color:var(--gray-light); font-size:13px; font-weight:500; letter-spacing:1px; text-transform:uppercase; transition:color .2s; cursor:pointer; text-decoration:none; }
  .nav-links a:hover, .nav-links a.act { color:var(--white); }
  .nav-admin-btn {
    background:linear-gradient(135deg,#1e0508,#2a0810); border:1px solid #6b1020;
    color:#fca5a5; font-family:'Outfit',sans-serif; font-size:12px; font-weight:600;
    letter-spacing:1px; text-transform:uppercase; padding:8px 18px; border-radius:8px;
    cursor:pointer; transition:all .2s; display:flex; align-items:center; gap:7px;
  }
  .nav-admin-btn:hover, .nav-admin-btn.act { background:var(--red); border-color:var(--red); color:white; }
  
  /* Hamburger */
  .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:4px; background:none; border:none; }
  .hamburger span { display:block; width:24px; height:2px; background:var(--white); border-radius:2px; transition:all .3s; }
  .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity:0; }
  .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
  
  .mobile-menu {
    display:none; position:fixed; top:var(--header-stack); left:0; right:0; z-index:190;
    background:rgba(10,10,10,.98); backdrop-filter:blur(12px);
    border-bottom:1px solid var(--border);
    flex-direction:column; padding:16px 24px 20px; gap:4px;
  }
  .mobile-menu.open { display:flex; }
  .mobile-menu a { color:var(--gray-light); font-size:14px; font-weight:500; letter-spacing:1px; text-transform:uppercase; padding:12px 0; border-bottom:1px solid #1a1a1a; cursor:pointer; transition:color .2s; }
  .mobile-menu a:last-of-type { border-bottom:none; }
  .mobile-menu a:hover { color:var(--white); }
  .mobile-menu .mob-admin { margin-top:8px; background:var(--red); border:none; border-radius:8px; color:white; font-family:'Outfit',sans-serif; font-size:13px; font-weight:600; letter-spacing:1px; padding:12px; cursor:pointer; width:100%; text-transform:uppercase; }

  /* ── HERO ── */
  .hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; overflow:hidden; padding:120px 24px 60px; }
  .hero-bg { position:absolute; inset:0; z-index:0; background:radial-gradient(ellipse 80% 60% at 50% 40%, #1a0a0a 0%, var(--black) 70%); }
  .tire-ring { position:absolute; width:700px; height:700px; border-radius:50%; border:80px solid #111; top:50%; left:50%; transform:translate(-50%,-50%); opacity:.5; animation:spin 40s linear infinite; }
  .tire-ring::before { content:''; position:absolute; inset:-20px; border-radius:50%; border:6px dashed #222; }
  @keyframes spin { to { transform:translate(-50%,-50%) rotate(360deg); } }
  .hero-content { position:relative; z-index:1; text-align:center; max-width:860px; }
  .badge { display:inline-block; background:var(--red); color:white; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:6px 16px; border-radius:2px; margin-bottom:24px; }
  .hero h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(48px,8.2vw,92px); line-height:.9; letter-spacing:4px; margin-bottom:20px; }
  .hero h1 em { color:var(--red); font-style:normal; }
  .hero-name { display:inline-flex; align-items:baseline; gap:.16em; white-space:nowrap; font-size:.8em; }
  .hero-subname { display:inline-block; font-size:.68em; letter-spacing:3px; color:var(--white); }
  .hero p { color:var(--gray-light); font-size:16px; font-weight:300; max-width:500px; margin:0 auto 48px; line-height:1.7; }
  .search-card { background:var(--gray); border:1px solid #2a2a2a; border-radius:12px; padding:28px 32px 24px; width:100%; max-width:820px; box-shadow:0 40px 80px rgba(0,0,0,.6); }
  .search-card h2 { font-size:12px; text-transform:uppercase; letter-spacing:2px; color:var(--gray-light); margin-bottom:18px; font-weight:500; }
  .search-row { display:grid; grid-template-columns:1fr 1fr 1fr auto; gap:12px; align-items:end; }
  .field { display:flex; flex-direction:column; gap:7px; }
  .field label { font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:var(--gray-light); font-weight:600; }
  .field select, .field input { background:var(--black); border:1px solid #333; border-radius:6px; color:var(--white); font-family:'Outfit',sans-serif; font-size:14px; padding:11px 14px; outline:none; transition:border-color .2s; appearance:none; width:100%; }
  .field select:focus, .field input:focus { border-color:var(--red); }
  .search-btn { background:var(--red); border:none; border-radius:6px; color:white; font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:2px; padding:11px 28px; cursor:pointer; transition:background .2s, transform .1s; white-space:nowrap; }
  .search-btn:hover { background:var(--red-dark); transform:translateY(-1px); }
  .stats { display:flex; margin-top:48px; position:relative; z-index:1; flex-wrap:wrap; justify-content:center; }
  .stat { padding:16px 36px; border-right:1px solid #222; text-align:center; }
  .stat:last-child { border-right:none; }
  .stat-num { font-family:'Bebas Neue',sans-serif; font-size:34px; color:var(--red); letter-spacing:2px; }
  .stat-label { font-size:11px; color:var(--gray-light); text-transform:uppercase; letter-spacing:1px; }
  
  /* ── HOME SECTIONS ── */
  .brands-section { padding:70px 48px; border-top:1px solid #1a1a1a; text-align:center; }
  .brands-section h3 { font-size:12px; text-transform:uppercase; letter-spacing:3px; color:var(--gray-light); margin-bottom:32px; }
  .brands-row { display:flex; gap:44px; justify-content:center; flex-wrap:wrap; }
  .brand-name-s { font-family:'Bebas Neue',sans-serif; font-size:26px; color:#333; letter-spacing:3px; transition:color .2s; cursor:default; }
  .brand-name-s:hover { color:var(--white); }

  /* WHY US */
  .why-section { padding:80px 48px; border-top:1px solid #1a1a1a; }
  .why-section .sec-header { text-align:center; margin-bottom:52px; }
  .why-section .sec-header .eyebrow { font-size:11px; text-transform:uppercase; letter-spacing:3px; color:var(--red); font-weight:700; margin-bottom:14px; }
  .why-section .sec-header h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,5vw,56px); letter-spacing:3px; }
  .why-section .sec-header p { color:var(--gray-light); font-size:15px; margin-top:12px; max-width:480px; margin-left:auto; margin-right:auto; line-height:1.7; }
  .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:960px; margin:0 auto; }
  .why-card { background:#111; border:1px solid #1e1e1e; border-radius:14px; padding:32px 28px; transition:border-color .2s, transform .2s; }
  .why-card:hover { border-color:var(--red); transform:translateY(-4px); }
  .why-icon { font-size:38px; margin-bottom:18px; }
  .why-card h3 { font-size:18px; font-weight:700; margin-bottom:10px; }
  .why-card p { color:var(--gray-light); font-size:14px; line-height:1.7; }

  /* SERVICES */
  .services-section { padding:80px 48px; background:#080808; border-top:1px solid #1a1a1a; border-bottom:1px solid #1a1a1a; }
  .services-section .sec-header { text-align:center; margin-bottom:48px; }
  .services-section .sec-header .eyebrow { font-size:11px; text-transform:uppercase; letter-spacing:3px; color:var(--red); font-weight:700; margin-bottom:14px; }
  .services-section .sec-header h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,5vw,56px); letter-spacing:3px; }
  .services-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; max-width:900px; margin:0 auto; }
  .service-card { display:flex; gap:20px; align-items:flex-start; background:#111; border:1px solid #1e1e1e; border-radius:12px; padding:24px; transition:border-color .2s; }
  .service-card:hover { border-color:#333; }
  .svc-icon { font-size:32px; flex-shrink:0; }
  .svc-body h3 { font-size:16px; font-weight:700; margin-bottom:7px; }
  .svc-body p { color:var(--gray-light); font-size:13px; line-height:1.6; }

  /* TESTIMONIALS */
  .reviews-section { padding:80px 48px; border-top:1px solid #1a1a1a; }
  .reviews-section .sec-header { text-align:center; margin-bottom:48px; }
  .reviews-section .sec-header .eyebrow { font-size:11px; text-transform:uppercase; letter-spacing:3px; color:var(--red); font-weight:700; margin-bottom:14px; }
  .reviews-section .sec-header h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,5vw,56px); letter-spacing:3px; }
  .reviews-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; max-width:1000px; margin:0 auto; }
  .review-card { background:#111; border:1px solid #1e1e1e; border-radius:14px; padding:28px; }
  .review-stars { color:var(--accent); font-size:16px; margin-bottom:14px; }
  .review-text { color:#ccc; font-size:14px; line-height:1.7; margin-bottom:18px; font-style:italic; }
  .review-author { display:flex; align-items:center; gap:12px; }
  .review-avatar { width:40px; height:40px; border-radius:50%; background:var(--red); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:15px; flex-shrink:0; }
  .review-name { font-weight:600; font-size:14px; }
  .review-car { font-size:12px; color:var(--gray-light); }

  /* CTA STRIP */
  .cta-strip { padding:64px 48px; background:linear-gradient(135deg,#1a0507,#0a0a0a); border-top:1px solid #2a0810; text-align:center; }
  .cta-strip h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,5vw,58px); letter-spacing:4px; margin-bottom:16px; }
  .cta-strip p { color:var(--gray-light); font-size:15px; max-width:420px; margin:0 auto 36px; line-height:1.7; }
  .cta-btn-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
  .cta-primary { background:var(--red); border:none; border-radius:8px; color:white; font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:2px; padding:14px 36px; cursor:pointer; transition:background .2s, transform .15s; }
  .cta-primary:hover { background:var(--red-dark); transform:translateY(-2px); }
  .cta-secondary { background:transparent; border:2px solid #333; border-radius:8px; color:var(--white); font-family:'Outfit',sans-serif; font-size:14px; font-weight:600; padding:13px 28px; cursor:pointer; transition:border-color .2s, color .2s; letter-spacing:1px; }
  .cta-secondary:hover { border-color:var(--white); }

  /* CONTACT */
  .contact-section { padding:80px 48px; border-top:1px solid #1a1a1a; }
  .contact-section .sec-header { text-align:center; margin-bottom:52px; }
  .contact-section .sec-header .eyebrow { font-size:11px; text-transform:uppercase; letter-spacing:3px; color:var(--red); font-weight:700; margin-bottom:14px; }
  .contact-section .sec-header h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,5vw,56px); letter-spacing:3px; }
  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; max-width:900px; margin:0 auto; }
  .contact-info { display:flex; flex-direction:column; gap:28px; }
  .contact-item { display:flex; gap:20px; align-items:flex-start; }
  .contact-ico { font-size:34px; flex-shrink:0; line-height:1; }
  .contact-detail h4 { font-size:20px; font-weight:700; margin-bottom:8px; }
  .contact-detail p { color:var(--gray-light); font-size:18px; line-height:1.7; }
  .contact-map-card { background:#111; border:1px solid #1e1e1e; border-radius:14px; overflow:hidden; display:flex; flex-direction:column; min-height:340px; }
  .contact-map-head { padding:14px 16px; border-bottom:1px solid #1e1e1e; display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .contact-map-head h3 { font-size:14px; font-weight:700; }
  .contact-map-link { color:var(--red); font-size:11px; text-transform:uppercase; letter-spacing:1px; font-weight:700; text-decoration:none; }
  .contact-map-link:hover { color:#ff5b6a; }
  .contact-map-frame { width:100%; height:100%; min-height:290px; border:0; flex:1; filter:grayscale(.08) contrast(1.02); }

  /* FOOTER */
  .footer { background:#060606; border-top:1px solid #1a1a1a; padding:48px 48px 28px; }
  .footer-grid { display:grid; grid-template-columns:2fr 1fr; gap:40px; margin-bottom:40px; }
  .footer-brand { max-width:280px; }
  .footer-brand p { color:var(--gray-light); font-size:13px; line-height:1.7; margin-top:12px; }
  .footer-col h4 { font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#555; font-weight:700; margin-bottom:16px; }
  .footer-col a { display:block; color:#666; font-size:13px; margin-bottom:10px; cursor:pointer; transition:color .2s; text-decoration:none; }
  .footer-col a:hover { color:var(--white); }
  .footer-bottom { border-top:1px solid #1a1a1a; padding-top:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; }
  .footer-copy { font-size:15px; color:#5c5c5c; }
  .footer-made { font-size:15px; color:#5c5c5c; }

  /* ── PRODUCTS PAGE ── */
  .products-page { padding-top:var(--header-stack); min-height:100vh; display:flex; flex-direction:column; }
  .products-topbar { display:flex; align-items:center; gap:14px; padding:12px 22px; border-bottom:1px solid var(--border); background:rgba(10,10,10,.98); position:sticky; top:var(--header-stack); z-index:100; flex-wrap:wrap; }
  .back-btn { background:none; border:1px solid #333; color:var(--gray-light); font-family:'Outfit',sans-serif; font-size:12px; padding:7px 14px; border-radius:4px; cursor:pointer; transition:all .2s; letter-spacing:1px; text-transform:uppercase; display:inline-flex; align-items:center; gap:6px; flex-shrink:0; }
  .back-btn:hover { border-color:var(--white); color:var(--white); }
  .topbar-title { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:2px; }
  .topbar-title span { color:var(--red); }
  .topbar-right { display:flex; gap:10px; align-items:center; margin-left:auto; }
  .topbar-count { color:var(--gray-light); font-size:13px; white-space:nowrap; }
  .sort-select { background:#1a1a1a; border:1px solid var(--border); border-radius:6px; color:var(--white); font-family:'Outfit',sans-serif; font-size:13px; padding:7px 12px; outline:none; cursor:pointer; appearance:none; }
  .active-filters { display:flex; gap:7px; flex-wrap:wrap; padding:9px 22px; border-bottom:1px solid #181818; align-items:center; background:#0c0c0c; }
  .active-label { font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--gray-light); flex-shrink:0; }
  .af-chip { display:inline-flex; align-items:center; gap:5px; background:#1e0508; border:1px solid #6b0f1a; color:#fca5a5; border-radius:20px; padding:3px 10px; font-size:11px; cursor:pointer; transition:background .15s; }
  .af-chip:hover { background:#3a0a12; }
  .af-x { color:var(--red); font-weight:700; font-size:13px; }
  .clear-all-btn { margin-left:auto; background:none; border:none; color:var(--red); font-size:11px; cursor:pointer; text-transform:uppercase; letter-spacing:1px; font-family:'Outfit',sans-serif; }
  .clear-all-btn:hover { text-decoration:underline; }
  .products-layout { display:flex; flex:1; }
  
  /* Mobile filter toggle */
  .mob-filter-btn { display:none; background:var(--red); border:none; border-radius:8px; color:white; font-family:'Outfit',sans-serif; font-size:13px; font-weight:600; padding:9px 18px; cursor:pointer; gap:7px; align-items:center; }
  .mob-filter-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.7); z-index:300; }
  .mob-filter-overlay.open { display:block; }
  
  .sidebar { width:248px; flex-shrink:0; background:var(--sidebar-bg); border-right:1px solid var(--border); position:sticky; top:144px; height:calc(100vh - 144px); overflow-y:auto; transition:transform .3s; }
  .sidebar::-webkit-scrollbar { width:3px; }
  .sidebar::-webkit-scrollbar-thumb { background:#2a2a2a; border-radius:2px; }
  .sidebar-search { padding:12px 14px; border-bottom:1px solid var(--border); }
  .sidebar-search input { width:100%; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:6px; color:var(--white); font-family:'Outfit',sans-serif; font-size:13px; padding:8px 11px; outline:none; transition:border-color .2s; }
  .sidebar-search input:focus { border-color:var(--red); }
  .sidebar-search input::placeholder { color:#444; }
  .filter-group { border-bottom:1px solid #1a1a1a; }
  .fgh { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; cursor:pointer; user-select:none; transition:background .15s; }
  .fgh:hover { background:#181818; }
  .fgh-label { font-size:10px; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; color:#ccc; }
  .fgh-arrow { color:var(--gray-light); font-size:9px; transition:transform .2s; }
  .fgh-arrow.open { transform:rotate(180deg); }
  .fgb { padding:4px 14px 12px; }
  .fo { display:flex; align-items:center; gap:9px; padding:5px 0; cursor:pointer; }
  .fo:hover .fo-lbl { color:var(--white); }
  .fo-box { width:15px; height:15px; border:1.5px solid #3a3a3a; border-radius:3px; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .15s; }
  .fo-box.chk { background:var(--red); border-color:var(--red); }
  .fo-chk { color:white; font-size:9px; font-weight:900; }
  .fo-lbl { font-size:12px; color:#999; flex:1; transition:color .15s; }
  .fo-cnt { font-size:10px; color:#555; background:#1e1e1e; border-radius:8px; padding:1px 6px; }
  .price-display { display:flex; justify-content:space-between; margin-bottom:12px; gap:8px; }
  .price-val-box { background:#1a1a1a; border:1px solid #2a2a2a; border-radius:4px; padding:4px 9px; font-size:12px; font-weight:600; color:var(--white); flex:1; text-align:center; }
  .range-wrap { position:relative; height:20px; margin-bottom:6px; }
  .range-track-bg { position:absolute; top:8px; left:0; right:0; height:4px; background:#2a2a2a; border-radius:2px; }
  .range-track-fill { position:absolute; top:8px; height:4px; background:var(--red); border-radius:2px; }
  .range-inp { position:absolute; top:0; left:0; width:100%; height:20px; background:transparent; -webkit-appearance:none; appearance:none; pointer-events:none; outline:none; }
  .range-inp::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:var(--white); border:2px solid var(--red); cursor:pointer; pointer-events:all; box-shadow:0 1px 4px rgba(0,0,0,.5); }
  .rating-hint { font-size:10px; color:#555; margin-bottom:8px; line-height:1.5; }
  .rating-row { display:flex; gap:4px; flex-wrap:wrap; }
  .r-btn { width:28px; height:24px; border-radius:3px; border:1.5px solid #2a2a2a; background:#1a1a1a; color:#666; font-size:11px; font-weight:700; cursor:pointer; transition:all .15s; font-family:'Outfit',sans-serif; display:flex; align-items:center; justify-content:center; }
  .r-btn:hover { border-color:var(--red); color:var(--white); }
  .r-btn.sel { border-color:transparent; color:white; }
  .noise-label { font-size:12px; color:var(--white); margin-bottom:7px; font-weight:600; }
  .products-main { flex:1; padding:18px 22px; min-width:0; }
  .view-row { display:flex; align-items:center; justify-content:flex-end; margin-bottom:16px; gap:6px; }
  .view-btn { background:#1a1a1a; border:1px solid #2a2a2a; border-radius:4px; padding:5px 10px; cursor:pointer; color:var(--gray-light); font-size:12px; transition:all .15px; }
  .view-btn.active { border-color:var(--red); color:var(--red); background:#1e0508; }
  .view-btn:hover:not(.active) { border-color:#444; color:var(--white); }
  .products-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:18px; }
  .products-grid.list { grid-template-columns:1fr; }
  .product-card { background:#141414; border:1px solid #1e1e1e; border-radius:14px; overflow:hidden; transition:border-color .2s, transform .2s, box-shadow .2s; cursor:pointer; }
  .product-card:hover { border-color:#e8192c44; transform:translateY(-2px); box-shadow:0 8px 24px rgba(232,25,44,.08); }
  .product-card.lc { display:flex; flex-direction:row; }
  .product-img { background:linear-gradient(135deg,#0f0f0f 0%,#1a1a1a 100%); height:210px; display:flex; align-items:center; justify-content:center; font-size:82px; position:relative; overflow:hidden; flex-shrink:0; }
  .product-img::after { content:''; position:absolute; inset:0; background:radial-gradient(circle at center, transparent 40%, rgba(0,0,0,.25) 100%); }
  .product-thumb { width:100%; height:100%; object-fit:cover; position:relative; z-index:1; }
  .lc .product-img { width:180px; height:auto; }
  .product-info { padding:18px; flex:1; display:flex; flex-direction:column; }
  .brand-tag { font-size:11px; text-transform:uppercase; letter-spacing:2px; color:var(--red); font-weight:700; margin-bottom:6px; }
  .product-name { font-size:18px; font-weight:600; margin-bottom:5px; line-height:1.3; }
  .product-dim { font-size:14px; color:var(--gray-light); margin-bottom:12px; }
  .label-row { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
  .lbadge { font-size:11px; padding:4px 7px; border-radius:4px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; }
  .lb-f-A{background:#052e16;color:#4ade80;} .lb-f-B{background:#14532d;color:#86efac;} .lb-f-C{background:#713f12;color:#fcd34d;} .lb-f-D{background:#7f1d1d;color:#fca5a5;}
  .lb-w-A{background:#172554;color:#93c5fd;} .lb-w-B{background:#1e3a8a;color:#bfdbfe;} .lb-w-C{background:#3b0764;color:#d8b4fe;}
  .lb-noise{background:#1c1917;color:#a8a29e;border:1px solid #292524;} .lb-info{background:#1c1917;color:#78716c;border:1px solid #1e1e1e;}
  .product-footer { display:flex; align-items:center; justify-content:space-between; margin-top:auto; gap:12px; }
  .price { font-family:'Bebas Neue',sans-serif; font-size:28px; color:var(--accent); letter-spacing:1px; }
  .price span { font-family:'Outfit',sans-serif; font-size:13px; color:var(--gray-light); }
  .buy-btn { background:var(--red); border:none; border-radius:6px; color:white; font-weight:600; font-size:13px; padding:9px 16px; cursor:pointer; transition:background .2s; font-family:'Outfit',sans-serif; white-space:nowrap; }
  .buy-btn:hover { background:var(--red-dark); }
  .no-results { text-align:center; padding:80px 0; }
  .no-results .emoji { font-size:56px; margin-bottom:16px; }
  .no-results h3 { font-size:22px; margin-bottom:8px; }
  .no-results p { color:var(--gray-light); font-size:14px; }

  /* ══════════════════
     PASSWORD GATE
  ══════════════════ */
  .pw-overlay { position:fixed; inset:0; background:rgba(0,0,0,.92); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(10px); }
  .pw-box { background:#111; border:1px solid #2a2a2a; border-radius:20px; padding:48px 40px; width:100%; max-width:420px; text-align:center; box-shadow:0 40px 100px rgba(0,0,0,.8); }
  .pw-icon { font-size:52px; margin-bottom:20px; }
  .pw-box h2 { font-family:'Bebas Neue',sans-serif; font-size:32px; letter-spacing:3px; margin-bottom:8px; }
  .pw-box p { color:var(--gray-light); font-size:14px; margin-bottom:32px; line-height:1.6; }
  .pw-field { position:relative; margin-bottom:20px; }
  .pw-input { width:100%; background:#0d0d0d; border:2px solid #2a2a2a; border-radius:12px; color:var(--white); font-family:'Outfit',sans-serif; font-size:18px; padding:16px 50px 16px 18px; outline:none; text-align:center; letter-spacing:4px; transition:border-color .2s, box-shadow .2s; }
  .pw-input:focus { border-color:var(--red); box-shadow:0 0 0 4px rgba(232,25,44,.1); }
  .pw-input.err { border-color:#f87171; animation:shake .4s; }
  @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
  .pw-toggle { position:absolute; right:16px; top:50%; transform:translateY(-50%); background:none; border:none; color:#555; cursor:pointer; font-size:18px; transition:color .2s; }
  .pw-toggle:hover { color:var(--white); }
  .pw-err { color:#f87171; font-size:13px; margin-bottom:16px; min-height:20px; }
  .pw-submit { background:var(--red); border:none; border-radius:12px; color:white; font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:2px; padding:16px; width:100%; cursor:pointer; transition:background .2s, transform .1s; }
  .pw-submit:hover { background:var(--red-dark); transform:translateY(-1px); }
  .pw-cancel { margin-top:14px; background:none; border:none; color:#555; font-family:'Outfit',sans-serif; font-size:13px; cursor:pointer; transition:color .2s; }
  .pw-cancel:hover { color:var(--white); }

  /* ════════════════════════════════════
     DASHBOARD
  ════════════════════════════════════ */
  .dash-wrap { padding-top:var(--header-stack); min-height:100vh; display:flex; background:#0d0d0d; }
  .dash-sidenav {
    width:200px; flex-shrink:0; background:#080808;
    border-right:1px solid #1a1a1a;
    position:sticky; top:var(--header-stack); height:calc(100vh - var(--header-stack));
    display:flex; flex-direction:column;
    padding:20px 0;
  }
  .dash-sidenav-title { padding:0 18px 16px; border-bottom:1px solid #1a1a1a; margin-bottom:12px; }
  .dash-sidenav-title p { font-size:10px; text-transform:uppercase; letter-spacing:2px; color:#555; margin-top:3px; }
  .dash-nav-btn {
    display:flex; align-items:center; gap:12px; padding:13px 18px;
    cursor:pointer; transition:all .15s; color:#888; font-size:14px; font-weight:500;
    border-left:3px solid transparent; background:transparent; border-right:none; border-top:none; border-bottom:none;
    font-family:'Outfit',sans-serif; width:100%; text-align:left;
  }
  .dash-nav-btn:hover { color:var(--white); background:#111; }
  .dash-nav-btn.dn-act { color:var(--white); background:#1a0305; border-left-color:var(--red); }
  .dash-nav-icon { font-size:18px; }
  .dash-sidenav-footer { margin-top:auto; padding:14px 18px; border-top:1px solid #1a1a1a; font-size:11px; color:#444; line-height:1.6; }
  .dash-sidenav-footer strong { color:#666; }
  .dash-body { flex:1; padding:28px 32px; overflow-y:auto; min-width:0; }
  .dash-page-title { margin-bottom:24px; }
  .dash-page-title h1 { font-family:'Bebas Neue',sans-serif; font-size:32px; letter-spacing:3px; }
  .dash-page-title p { color:#666; font-size:14px; margin-top:4px; }
  .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:28px; }
  .kpi { background:#111; border:1px solid #1e1e1e; border-radius:12px; padding:20px; position:relative; overflow:hidden; }
  .kpi::after { content:''; position:absolute; top:0; left:0; right:0; height:3px; border-radius:12px 12px 0 0; }
  .kpi-r::after { background:var(--red); } .kpi-g::after { background:var(--green); } .kpi-o::after { background:var(--orange); } .kpi-b::after { background:var(--blue); }
  .kpi-ico { font-size:28px; margin-bottom:12px; }
  .kpi-n { font-family:'Bebas Neue',sans-serif; font-size:36px; letter-spacing:2px; line-height:1; }
  .kpi-lbl { font-size:12px; color:#666; text-transform:uppercase; letter-spacing:1px; margin-top:4px; }
  .kpi-note { margin-top:8px; font-size:12px; }
  .kpi-note.ok { color:#4ade80; } .kpi-note.warn { color:#fb923c; }
  .alert-strip { background:#1c0a00; border:1px solid #7c2d12; border-radius:10px; padding:14px 18px; margin-bottom:20px; display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
  .alert-strip-icon { font-size:22px; flex-shrink:0; }
  .alert-strip-text { font-size:13px; color:#fed7aa; flex:1; }
  .alert-strip-text strong { color:#fb923c; }
  .alert-strip-btn { background:#7c2d12; border:none; border-radius:6px; color:#fed7aa; font-size:12px; font-weight:600; padding:6px 14px; cursor:pointer; font-family:'Outfit',sans-serif; white-space:nowrap; }
  .alert-strip-btn:hover { background:#9a3412; }
  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:24px; }
  .panel { background:#111; border:1px solid #1e1e1e; border-radius:12px; overflow:hidden; }
  .panel-head { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid #1a1a1a; }
  .panel-head h3 { font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; }
  .panel-head-action { font-size:12px; color:var(--red); cursor:pointer; background:none; border:none; font-family:'Outfit',sans-serif; }
  .panel-head-action:hover { text-decoration:underline; }
  .panel-body { padding:18px 20px; }
  .bbar { display:flex; flex-direction:column; gap:10px; }
  .bbar-row { display:flex; align-items:center; gap:10px; }
  .bbar-lbl { font-size:12px; color:#aaa; width:88px; flex-shrink:0; }
  .bbar-bg { flex:1; height:7px; background:#1e1e1e; border-radius:4px; overflow:hidden; }
  .bbar-fill { height:100%; background:var(--red); border-radius:4px; transition:width .4s; }
  .bbar-cnt { font-size:11px; color:#555; width:20px; text-align:right; flex-shrink:0; }
  .act-list { display:flex; flex-direction:column; }
  .act-item { display:flex; align-items:flex-start; gap:12px; padding:11px 0; border-bottom:1px solid #161616; }
  .act-item:last-child { border-bottom:none; }
  .act-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; margin-top:4px; }
  .dot-g{background:var(--green);} .dot-r{background:var(--red);} .dot-b{background:var(--blue);} .dot-o{background:var(--orange);}
  .act-text { font-size:13px; color:#bbb; flex:1; line-height:1.4; }
  .act-text strong { color:var(--white); }
  .act-time { font-size:11px; color:#444; flex-shrink:0; }
  .add-form-wrap { background:#111; border:1px solid #1e1e1e; border-radius:14px; overflow:hidden; max-width:860px; }
  .add-form-hero { background:linear-gradient(135deg,#1e0508,#0a0a0a); padding:28px 32px; display:flex; align-items:center; gap:20px; border-bottom:1px solid #1e1e1e; }
  .add-form-hero-icon { font-size:52px; }
  .add-form-hero h2 { font-family:'Bebas Neue',sans-serif; font-size:28px; letter-spacing:2px; }
  .add-form-hero p { font-size:14px; color:#aaa; margin-top:4px; }
  .form-body { padding:28px 32px; }
  .steps { display:flex; gap:0; margin-bottom:32px; flex-wrap:wrap; }
  .step { display:flex; align-items:center; gap:10px; }
  .step-num { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; flex-shrink:0; border:2px solid #333; color:#555; transition:all .2s; }
  .step-num.done { background:var(--green); border-color:var(--green); color:white; }
  .step-num.current { background:var(--red); border-color:var(--red); color:white; }
  .step-lbl { font-size:12px; font-weight:600; color:#555; white-space:nowrap; }
  .step-lbl.done { color:var(--green); } .step-lbl.current { color:var(--white); }
  .step-line { flex:1; height:2px; background:#1e1e1e; margin:0 10px; min-width:20px; }
  .step-line.done { background:var(--green); }
  .big-field { display:flex; flex-direction:column; gap:8px; margin-bottom:18px; }
  .big-label { font-size:13px; font-weight:700; color:var(--white); display:flex; align-items:center; gap:6px; }
  .big-label .req { color:var(--red); }
  .big-hint { font-size:12px; color:#555; }
  .big-input, .big-select, .big-textarea { background:#0d0d0d; border:2px solid #1e1e1e; border-radius:10px; color:var(--white); font-family:'Outfit',sans-serif; font-size:15px; padding:14px 16px; outline:none; transition:border-color .2s, box-shadow .2s; width:100%; appearance:none; }
  .big-input:focus, .big-select:focus, .big-textarea:focus { border-color:var(--red); box-shadow:0 0 0 4px rgba(232,25,44,.1); }
  .big-input.err, .big-select.err { border-color:#f87171; }
  .big-textarea { resize:vertical; min-height:80px; }
  .product-image-preview {
    width:100%;
    max-width:320px;
    height:190px;
    border-radius:10px;
    overflow:hidden;
    border:1px solid #2a2a2a;
    background:#0a0a0a;
    margin-top:-4px;
    margin-bottom:8px;
  }
  .product-image-preview img { width:100%; height:100%; object-fit:cover; display:block; }
  .err-msg { font-size:12px; color:#f87171; display:flex; align-items:center; gap:5px; }
  .dim-preview { background:#0a0a0a; border:1px solid #1e1e1e; border-radius:8px; padding:12px 16px; display:inline-flex; align-items:center; gap:14px; margin-top:6px; }
  .dim-preview-label { font-size:11px; color:#555; }
  .dim-preview-val { font-family:'Bebas Neue',sans-serif; font-size:22px; color:var(--accent); letter-spacing:2px; }
  .pill-row { display:flex; gap:8px; flex-wrap:wrap; }
  .pill { padding:10px 18px; border-radius:8px; border:2px solid #2a2a2a; background:#0d0d0d; color:#666; font-size:14px; font-weight:700; cursor:pointer; transition:all .15s; font-family:'Outfit',sans-serif; }
  .pill:hover { border-color:#555; color:var(--white); }
  .pill.psel { border-color:transparent; color:white; transform:scale(1.05); }
  .fg2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
  .fg3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:18px; }
  .sec-div { margin:28px 0 22px; border-top:1px solid #1e1e1e; padding-top:22px; }
  .sec-title { font-size:11px; text-transform:uppercase; letter-spacing:2.5px; color:var(--red); font-weight:700; margin-bottom:18px; display:flex; align-items:center; gap:10px; }
  .sec-title::after { content:''; flex:1; height:1px; background:#1e1e1e; }
  .submit-row { display:flex; gap:14px; align-items:center; padding-top:12px; margin-top:8px; border-top:1px solid #1e1e1e; flex-wrap:wrap; }
  .big-submit { background:var(--red); border:none; border-radius:10px; color:white; font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:2px; padding:16px 40px; cursor:pointer; transition:background .2s, transform .1s; display:flex; align-items:center; gap:10px; flex-shrink:0; }
  .big-submit:hover { background:var(--red-dark); transform:translateY(-1px); }
  .big-cancel { background:none; border:2px solid #2a2a2a; border-radius:10px; color:#888; font-family:'Outfit',sans-serif; font-size:14px; padding:14px 24px; cursor:pointer; transition:all .2s; }
  .big-cancel:hover { border-color:#555; color:var(--white); }
  .form-err-banner { background:#1e0508; border:1px solid #7f1d1d; border-radius:8px; padding:12px 16px; font-size:13px; color:#fca5a5; display:flex; align-items:center; gap:8px; }
  .inv-controls { display:flex; gap:14px; align-items:center; margin-bottom:20px; flex-wrap:wrap; }
  .big-search { background:#111; border:2px solid #1e1e1e; border-radius:10px; color:var(--white); font-family:'Outfit',sans-serif; font-size:15px; padding:12px 16px; outline:none; transition:border-color .2s; width:100%; max-width:420px; }
  .big-search:focus { border-color:var(--red); }
  .big-search::placeholder { color:#444; }
  .dim-search-row { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
  .dim-inp { background:#111; border:2px solid #1e1e1e; border-radius:8px; color:var(--white); font-family:'Outfit',sans-serif; font-size:14px; padding:10px 14px; outline:none; transition:border-color .2s; width:100px; }
  .dim-inp:focus { border-color:var(--red); }
  .dim-inp::placeholder { color:#444; }
  .dim-sep { font-family:'Bebas Neue',sans-serif; font-size:22px; color:#333; }
  .dim-search-btn { background:var(--red); border:none; border-radius:8px; color:white; font-family:'Outfit',sans-serif; font-size:13px; font-weight:600; padding:10px 20px; cursor:pointer; transition:background .2s; white-space:nowrap; }
  .dim-search-btn:hover { background:var(--red-dark); }
  .dim-clear-btn { background:none; border:2px solid #2a2a2a; border-radius:8px; color:#888; font-family:'Outfit',sans-serif; font-size:13px; padding:10px 16px; cursor:pointer; transition:all .2s; }
  .dim-clear-btn:hover { border-color:#555; color:var(--white); }
  .brand-accordion { display:flex; flex-direction:column; gap:10px; }
  .brand-block { background:#111; border:1px solid #1e1e1e; border-radius:12px; overflow:hidden; }
  .brand-block-header { display:flex; align-items:center; gap:14px; padding:16px 20px; cursor:pointer; user-select:none; transition:background .15s; }
  .brand-block-header:hover { background:#181818; }
  .brand-logo-circle { width:44px; height:44px; border-radius:50%; background:#1a1a1a; border:2px solid #2a2a2a; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
  .brand-block-info { flex:1; min-width:0; }
  .brand-block-name { font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:2px; }
  .brand-block-sub { font-size:12px; color:#666; margin-top:1px; }
  .brand-block-badges { display:flex; gap:8px; flex-shrink:0; align-items:center; }
  .brand-count-badge { background:#1e1e1e; border:1px solid #2a2a2a; border-radius:20px; padding:4px 12px; font-size:12px; color:#888; }
  .brand-out-badge { background:#450a0a; border:1px solid #7f1d1d; border-radius:20px; padding:4px 10px; font-size:11px; color:#fca5a5; font-weight:600; }
  .brand-block-arrow { font-size:11px; color:#444; transition:transform .2s; flex-shrink:0; }
  .brand-block-arrow.open { transform:rotate(180deg); }
  .brand-tire-list { border-top:1px solid #1a1a1a; }
  .tire-row { display:flex; align-items:center; gap:14px; padding:14px 20px; border-bottom:1px solid #141414; transition:background .15s; flex-wrap:wrap; }
  .tire-row:last-child { border-bottom:none; }
  .tire-row:hover { background:#161616; }
  .tire-row-icon {
    width:46px;
    height:46px;
    border-radius:8px;
    border:1px solid #2a2a2a;
    background:#0b0b0b;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:24px;
    overflow:hidden;
    flex-shrink:0;
  }
  .tire-row-thumb { width:100%; height:100%; object-fit:cover; display:block; }
  .tire-row-info { flex:1; min-width:120px; }
  .tire-row-name { font-size:14px; font-weight:600; }
  .tire-row-dim { font-size:12px; color:#666; margin-top:2px; }
  .tire-row-type { font-size:11px; color:#888; }
  .tire-row-price { font-family:'Bebas Neue',sans-serif; font-size:22px; color:var(--accent); letter-spacing:1px; flex-shrink:0; }
  .tire-stock-badge { border-radius:20px; padding:5px 12px; font-size:12px; font-weight:600; flex-shrink:0; }
  .s-ok{background:#052e16;color:#4ade80;} .s-low{background:#431407;color:#fb923c;} .s-out{background:#450a0a;color:#fca5a5;}
  .tire-row-actions { display:flex; gap:8px; flex-shrink:0; }
  .action-btn { padding:8px 14px; border-radius:7px; border:1.5px solid #2a2a2a; background:transparent; color:#888; font-size:12px; font-weight:600; cursor:pointer; transition:all .15s; font-family:'Outfit',sans-serif; display:flex; align-items:center; gap:5px; }
  .action-btn:hover { border-color:var(--red); color:var(--white); background:#1e0508; }
  .action-btn.del-btn:hover { border-color:#f87171; color:#f87171; background:#450a0a; }
  .overlay { position:fixed; inset:0; background:rgba(0,0,0,.85); z-index:600; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(6px); }
  .modal-box { background:#111; border:1px solid #2a2a2a; border-radius:16px; width:100%; max-width:580px; max-height:90vh; overflow-y:auto; box-shadow:0 32px 80px rgba(0,0,0,.8); }
  .modal-box::-webkit-scrollbar { width:4px; }
  .modal-box::-webkit-scrollbar-thumb { background:#333; border-radius:2px; }
  .modal-hdr { padding:22px 26px; border-bottom:1px solid #1e1e1e; display:flex; justify-content:space-between; align-items:center; }
  .modal-hdr h2 { font-family:'Bebas Neue',sans-serif; font-size:24px; letter-spacing:2px; }
  .modal-hdr p { font-size:13px; color:#666; margin-top:3px; }
  .modal-close { background:none; border:none; color:#555; font-size:26px; cursor:pointer; line-height:1; transition:color .15s; flex-shrink:0; }
  .modal-close:hover { color:var(--white); }
  .modal-bdy { padding:26px; }
  .modal-ftr { padding:18px 26px; border-top:1px solid #1e1e1e; display:flex; gap:12px; justify-content:flex-end; flex-wrap:wrap; }
  .modal-save { background:var(--green); border:none; border-radius:8px; color:white; font-family:'Outfit',sans-serif; font-size:14px; font-weight:700; padding:12px 28px; cursor:pointer; transition:background .2s; }
  .modal-save:hover { background:#15803d; }
  .modal-discard { background:none; border:2px solid #2a2a2a; border-radius:8px; color:#888; font-family:'Outfit',sans-serif; font-size:14px; padding:11px 20px; cursor:pointer; transition:all .2s; }
  .modal-discard:hover { border-color:#555; color:var(--white); }
  .modal-delete { background:#7f1d1d; border:none; border-radius:8px; color:#fca5a5; font-family:'Outfit',sans-serif; font-size:14px; font-weight:700; padding:12px 24px; cursor:pointer; transition:background .2s; }
  .modal-delete:hover { background:#991b1b; }
  .mf { display:flex; flex-direction:column; gap:7px; margin-bottom:16px; }
  .mf label { font-size:12px; font-weight:700; color:#aaa; text-transform:uppercase; letter-spacing:1px; }
  .mf input, .mf select { background:#0d0d0d; border:2px solid #1e1e1e; border-radius:8px; color:var(--white); font-family:'Outfit',sans-serif; font-size:15px; padding:12px 14px; outline:none; transition:border-color .2s; width:100%; appearance:none; }
  .mf input:focus, .mf select:focus { border-color:var(--green); }
  .toast { position:fixed; bottom:24px; right:24px; z-index:999; background:#052e16; border:1px solid var(--green); border-radius:12px; padding:14px 20px; display:flex; align-items:center; gap:14px; box-shadow:0 8px 40px rgba(0,0,0,.7); animation:slideUp .3s ease; max-width:340px; }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
  .toast-ico { font-size:24px; flex-shrink:0; }
  .toast-msg strong { display:block; font-size:14px; color:#4ade80; }
  .toast-msg span { font-size:12px; color:#86efac; }
  .toast-close { background:none; border:none; color:#4ade80; font-size:18px; cursor:pointer; margin-left:auto; flex-shrink:0; }
  .upload-zone {
    width:100%;
    border:2px dashed #2a2a2a;
    border-radius:10px;
    padding:24px;
    text-align:center;
    cursor:pointer;
    transition:all .2s;
    background:#0a0a0a;
    color:inherit;
    font-family:'Outfit',sans-serif;
  }
  .upload-zone:hover { border-color:var(--red); background:#0f0508; }
  .upload-zone:disabled { opacity:.65; cursor:not-allowed; }
  .upload-zone-ico { font-size:36px; margin-bottom:10px; }
  .upload-zone p { font-size:14px; color:#888; }
  .upload-zone span { font-size:12px; color:#444; display:block; margin-top:4px; }
  .image-remove-btn { margin-top:0; }
  .empty-state { text-align:center; padding:60px 0; }
  .empty-state .es-ico { font-size:52px; margin-bottom:16px; }
  .empty-state h3 { font-size:20px; margin-bottom:8px; }
  .empty-state p { color:#555; font-size:14px; }

  /* ════════════
     RESPONSIVE
  ════════════ */
  @media (max-width: 900px) {
    :root { --top-strip-height:30px; --header-stack:90px; }
    .top-contact-bar { height:30px; font-size:11px; gap:8px; padding:0 12px; }
    .top-contact-bar span { display:none; }
    .nav { padding:12px 20px; }
    .nav-links { display:none; }
    .hamburger { display:flex; }
    
    .hero { padding:100px 20px 50px; }
    .tire-ring { width:400px; height:400px; border-width:50px; }
    .search-row { grid-template-columns:1fr 1fr; }
    .search-row .search-btn { grid-column:span 2; }
    .stats { gap:0; }
    .stat { padding:12px 20px; }
    
    .why-grid { grid-template-columns:1fr 1fr; }
    .why-section, .services-section, .reviews-section, .contact-section, .brands-section { padding:60px 24px; }
    
    .services-grid { grid-template-columns:1fr; }
    .reviews-grid { grid-template-columns:1fr 1fr; }
    .contact-grid { grid-template-columns:1fr; }
    
    .footer { padding:40px 24px 20px; }
    .footer-grid { grid-template-columns:1fr 1fr; gap:28px; }
    .footer-brand { max-width:100%; }
    
    .products-topbar { padding:10px 14px; gap:8px; }
    .topbar-count { display:none; }
    .mob-filter-btn { display:inline-flex; }
    
    .sidebar { position:fixed; top:0; left:0; bottom:0; z-index:350; width:280px; transform:translateX(-100%); }
    .sidebar.mob-open { transform:translateX(0); }
    
    .products-main { padding:14px; }
    
    /* Dashboard mobile */
    .dash-wrap { flex-direction:column; }
    .dash-sidenav { width:100%; height:auto; position:relative; top:0; flex-direction:row; flex-wrap:wrap; padding:10px 16px; border-right:none; border-bottom:1px solid #1a1a1a; }
    .dash-sidenav-title { border-bottom:none; padding:0; margin:0; margin-right:auto; }
    .dash-sidenav-footer { display:none; }
    .dash-nav-btn { border-left:none; border-bottom:3px solid transparent; flex-direction:column; gap:4px; padding:8px 12px; font-size:11px; }
    .dash-nav-btn.dn-act { background:transparent; border-left-color:transparent; border-bottom-color:var(--red); }
    .dash-nav-icon { font-size:20px; }
    .dash-body { padding:16px; }
    
    .kpi-grid { grid-template-columns:1fr 1fr; }
    .two-col { grid-template-columns:1fr; }
    .fg2 { grid-template-columns:1fr; }
    .fg3 { grid-template-columns:1fr 1fr; }
    
    .add-form-hero { padding:20px; }
    .form-body { padding:20px; }
    
    .brand-block-badges { display:none; }
    .tire-row { gap:10px; }
    .dim-search-row { gap:6px; }
    .dim-inp { width:72px; }
    
    .pw-box { padding:32px 24px; }
  }
  
  @media (max-width: 580px) {
    .hero h1 { font-size:clamp(34px,10vw,56px); letter-spacing:2px; line-height:.95; }
    .hero-name { font-size:.66em; gap:.1em; }
    .hero-subname { letter-spacing:1.5px; }
    .search-row { grid-template-columns:1fr; }
    .search-row .search-btn { grid-column:span 1; }
    .stat { padding:10px 14px; border-right:none; border-bottom:1px solid #222; width:50%; }
    .stats { flex-wrap:wrap; border:1px solid #1a1a1a; border-radius:8px; overflow:hidden; }
    .stat:nth-child(odd) { border-right:1px solid #222; }
    .stat:nth-last-child(-n+2) { border-bottom:none; }
    
    .why-grid { grid-template-columns:1fr; }
    .reviews-grid { grid-template-columns:1fr; }
    .footer-grid { grid-template-columns:1fr; }
    
    .fg3 { grid-template-columns:1fr; }
    .products-grid { grid-template-columns:1fr; }
    
    .tire-row { flex-wrap:wrap; }
    .tire-row-actions { width:100%; justify-content:flex-end; }
    
    .kpi-grid { grid-template-columns:1fr 1fr; }
  }

  @media (max-width: 420px) {
    .hero h1 { font-size:clamp(30px,9.5vw,46px); letter-spacing:1.5px; }
    .hero-name { font-size:.62em; gap:.08em; }
    .hero-subname { letter-spacing:1px; }
  }
`;

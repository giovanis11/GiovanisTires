import React, { useState, useMemo, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --black:#0a0a0a; --red:#e8192c; --red-dark:#b50f1e; --red-soft:#fff1f2;
    --white:#f5f5f0; --gray:#141414; --gray-light:#777; --border:#222;
    --sidebar-bg:#0e0e0e; --accent:#f0c040;
    --green:#16a34a; --green-light:#dcfce7; --green-bg:#052e16;
    --blue:#3b82f6; --orange:#f97316; --orange-bg:#431407;
  }
  html, body, #root {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }
  body { background:var(--black); color:var(--white); font-family:'Outfit',sans-serif; min-height:100vh; }

  /* ── NAV ── */
  .nav {
    position:fixed; top:0; left:0; right:0; z-index:200;
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
    display:none; position:fixed; top:62px; left:0; right:0; z-index:190;
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
  .hero h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(52px,9vw,100px); line-height:.9; letter-spacing:4px; margin-bottom:20px; }
  .hero h1 em { color:var(--red); font-style:normal; }
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
  .contact-info { display:flex; flex-direction:column; gap:20px; }
  .contact-item { display:flex; gap:16px; align-items:flex-start; }
  .contact-ico { font-size:26px; flex-shrink:0; }
  .contact-detail h4 { font-size:14px; font-weight:700; margin-bottom:4px; }
  .contact-detail p { color:var(--gray-light); font-size:13px; line-height:1.6; }
  .contact-form-card { background:#111; border:1px solid #1e1e1e; border-radius:14px; padding:28px; }
  .contact-form-card h3 { font-size:16px; font-weight:700; margin-bottom:20px; }
  .cf-field { display:flex; flex-direction:column; gap:7px; margin-bottom:14px; }
  .cf-field label { font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:var(--gray-light); font-weight:600; }
  .cf-field input, .cf-field textarea { background:#0d0d0d; border:1px solid #2a2a2a; border-radius:8px; color:var(--white); font-family:'Outfit',sans-serif; font-size:14px; padding:11px 14px; outline:none; transition:border-color .2s; width:100%; }
  .cf-field input:focus, .cf-field textarea:focus { border-color:var(--red); }
  .cf-field textarea { resize:vertical; min-height:90px; }
  .cf-submit { background:var(--red); border:none; border-radius:8px; color:white; font-family:'Outfit',sans-serif; font-size:14px; font-weight:700; padding:13px 28px; cursor:pointer; width:100%; transition:background .2s; }
  .cf-submit:hover { background:var(--red-dark); }

  /* FOOTER */
  .footer { background:#060606; border-top:1px solid #1a1a1a; padding:48px 48px 28px; }
  .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:40px; margin-bottom:40px; }
  .footer-brand { max-width:280px; }
  .footer-brand p { color:var(--gray-light); font-size:13px; line-height:1.7; margin-top:12px; }
  .footer-col h4 { font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#555; font-weight:700; margin-bottom:16px; }
  .footer-col a { display:block; color:#666; font-size:13px; margin-bottom:10px; cursor:pointer; transition:color .2s; text-decoration:none; }
  .footer-col a:hover { color:var(--white); }
  .footer-bottom { border-top:1px solid #1a1a1a; padding-top:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; }
  .footer-copy { font-size:12px; color:#333; }
  .footer-made { font-size:12px; color:#333; }

  /* ── PRODUCTS PAGE ── */
  .products-page { padding-top:62px; min-height:100vh; display:flex; flex-direction:column; }
  .products-topbar { display:flex; align-items:center; gap:14px; padding:12px 22px; border-bottom:1px solid var(--border); background:rgba(10,10,10,.98); position:sticky; top:62px; z-index:100; flex-wrap:wrap; }
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
  
  .sidebar { width:248px; flex-shrink:0; background:var(--sidebar-bg); border-right:1px solid var(--border); position:sticky; top:110px; height:calc(100vh - 110px); overflow-y:auto; transition:transform .3s; }
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
  .products-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:14px; }
  .products-grid.list { grid-template-columns:1fr; }
  .product-card { background:#141414; border:1px solid #1e1e1e; border-radius:10px; overflow:hidden; transition:border-color .2s, transform .2s, box-shadow .2s; cursor:pointer; }
  .product-card:hover { border-color:#e8192c44; transform:translateY(-2px); box-shadow:0 8px 24px rgba(232,25,44,.08); }
  .product-card.lc { display:flex; flex-direction:row; }
  .product-img { background:linear-gradient(135deg,#0f0f0f 0%,#1a1a1a 100%); height:160px; display:flex; align-items:center; justify-content:center; font-size:68px; position:relative; overflow:hidden; flex-shrink:0; }
  .product-img::after { content:''; position:absolute; inset:0; background:radial-gradient(circle at center, transparent 40%, rgba(0,0,0,.25) 100%); }
  .lc .product-img { width:140px; height:auto; }
  .product-info { padding:13px; flex:1; display:flex; flex-direction:column; }
  .brand-tag { font-size:9px; text-transform:uppercase; letter-spacing:2px; color:var(--red); font-weight:700; margin-bottom:3px; }
  .product-name { font-size:13px; font-weight:600; margin-bottom:2px; line-height:1.3; }
  .product-dim { font-size:11px; color:var(--gray-light); margin-bottom:8px; }
  .label-row { display:flex; gap:3px; flex-wrap:wrap; margin-bottom:10px; }
  .lbadge { font-size:9px; padding:2px 5px; border-radius:3px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; }
  .lb-f-A{background:#052e16;color:#4ade80;} .lb-f-B{background:#14532d;color:#86efac;} .lb-f-C{background:#713f12;color:#fcd34d;} .lb-f-D{background:#7f1d1d;color:#fca5a5;}
  .lb-w-A{background:#172554;color:#93c5fd;} .lb-w-B{background:#1e3a8a;color:#bfdbfe;} .lb-w-C{background:#3b0764;color:#d8b4fe;}
  .lb-noise{background:#1c1917;color:#a8a29e;border:1px solid #292524;} .lb-info{background:#1c1917;color:#78716c;border:1px solid #1e1e1e;}
  .product-footer { display:flex; align-items:center; justify-content:space-between; margin-top:auto; }
  .price { font-family:'Bebas Neue',sans-serif; font-size:20px; color:var(--accent); letter-spacing:1px; }
  .price span { font-family:'Outfit',sans-serif; font-size:11px; color:var(--gray-light); }
  .buy-btn { background:var(--red); border:none; border-radius:4px; color:white; font-weight:600; font-size:11px; padding:6px 12px; cursor:pointer; transition:background .2s; font-family:'Outfit',sans-serif; white-space:nowrap; }
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
  .dash-wrap { padding-top:62px; min-height:100vh; display:flex; background:#0d0d0d; }
  .dash-sidenav {
    width:200px; flex-shrink:0; background:#080808;
    border-right:1px solid #1a1a1a;
    position:sticky; top:62px; height:calc(100vh - 62px);
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
  .tire-row-icon { font-size:24px; flex-shrink:0; }
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
  .upload-zone { border:2px dashed #2a2a2a; border-radius:10px; padding:32px; text-align:center; cursor:pointer; transition:all .2s; background:#0a0a0a; }
  .upload-zone:hover { border-color:var(--red); background:#0f0508; }
  .upload-zone-ico { font-size:36px; margin-bottom:10px; }
  .upload-zone p { font-size:14px; color:#888; }
  .upload-zone span { font-size:12px; color:#444; display:block; margin-top:4px; }
  .empty-state { text-align:center; padding:60px 0; }
  .empty-state .es-ico { font-size:52px; margin-bottom:16px; }
  .empty-state h3 { font-size:20px; margin-bottom:8px; }
  .empty-state p { color:#555; font-size:14px; }

  /* ════════════
     RESPONSIVE
  ════════════ */
  @media (max-width: 900px) {
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
    .hero h1 { font-size:clamp(42px,12vw,70px); }
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
    .products-grid { grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); }
    
    .tire-row { flex-wrap:wrap; }
    .tire-row-actions { width:100%; justify-content:flex-end; }
    
    .kpi-grid { grid-template-columns:1fr 1fr; }
  }
`;

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const INITIAL_TIRES = [
  { id:1,  brand:"Michelin",    name:"Pilot Sport 5",          width:"225", aspect:"45", rim:"17", type:"Καλοκαιρινό", price:189, fuel:"A", wet:"A", noise:70, load:91,  speed:"Y", stock:12 },
  { id:2,  brand:"Continental", name:"PremiumContact 7",       width:"225", aspect:"45", rim:"17", type:"Καλοκαιρινό", price:165, fuel:"B", wet:"A", noise:71, load:91,  speed:"W", stock:7  },
  { id:3,  brand:"Bridgestone", name:"Turanza T005",           width:"225", aspect:"45", rim:"17", type:"Καλοκαιρινό", price:152, fuel:"B", wet:"B", noise:72, load:91,  speed:"V", stock:0  },
  { id:4,  brand:"Pirelli",     name:"P Zero",                 width:"225", aspect:"45", rim:"17", type:"Καλοκαιρινό", price:210, fuel:"A", wet:"A", noise:69, load:94,  speed:"Y", stock:4  },
  { id:5,  brand:"Goodyear",    name:"Eagle F1 Asymmetric 6",  width:"225", aspect:"45", rim:"17", type:"Καλοκαιρινό", price:178, fuel:"A", wet:"A", noise:70, load:91,  speed:"Y", stock:19 },
  { id:6,  brand:"Michelin",    name:"Alpin 6",                width:"205", aspect:"55", rim:"16", type:"Χειμερινό",   price:145, fuel:"C", wet:"B", noise:70, load:91,  speed:"H", stock:8  },
  { id:7,  brand:"Continental", name:"WinterContact TS 870",   width:"205", aspect:"55", rim:"16", type:"Χειμερινό",   price:138, fuel:"C", wet:"A", noise:70, load:91,  speed:"T", stock:3  },
  { id:8,  brand:"Bridgestone", name:"Blizzak LM005",          width:"205", aspect:"55", rim:"16", type:"Χειμερινό",   price:129, fuel:"D", wet:"A", noise:71, load:91,  speed:"H", stock:0  },
  { id:9,  brand:"Pirelli",     name:"Scorpion All Season+",   width:"235", aspect:"60", rim:"18", type:"All Season",  price:198, fuel:"B", wet:"A", noise:72, load:107, speed:"V", stock:6  },
  { id:10, brand:"Goodyear",    name:"Vector 4Seasons Gen-3",  width:"235", aspect:"60", rim:"18", type:"All Season",  price:185, fuel:"B", wet:"A", noise:71, load:107, speed:"V", stock:11 },
  { id:11, brand:"Nokian",      name:"Hakkapeliitta R5",       width:"225", aspect:"50", rim:"17", type:"Χειμερινό",   price:178, fuel:"D", wet:"A", noise:70, load:98,  speed:"R", stock:2  },
  { id:12, brand:"Hankook",     name:"Ventus S1 evo3",         width:"245", aspect:"40", rim:"19", type:"Καλοκαιρινό", price:155, fuel:"B", wet:"A", noise:70, load:98,  speed:"Y", stock:14 },
  { id:13, brand:"Dunlop",      name:"Sport Maxx RT2",         width:"245", aspect:"45", rim:"18", type:"Καλοκαιρινό", price:142, fuel:"C", wet:"B", noise:71, load:100, speed:"Y", stock:5  },
  { id:14, brand:"Falken",      name:"Azenis FK520",           width:"215", aspect:"55", rim:"17", type:"Καλοκαιρινό", price:99,  fuel:"B", wet:"A", noise:70, load:98,  speed:"W", stock:9  },
  { id:15, brand:"Michelin",    name:"CrossClimate 2",         width:"215", aspect:"55", rim:"17", type:"All Season",  price:162, fuel:"B", wet:"A", noise:69, load:98,  speed:"V", stock:16 },
  { id:16, brand:"Toyo",        name:"Proxes Sport",           width:"235", aspect:"45", rim:"18", type:"Καλοκαιρινό", price:132, fuel:"C", wet:"B", noise:72, load:98,  speed:"Y", stock:1  },
  { id:17, brand:"Continental", name:"AllSeasonContact 2",     width:"215", aspect:"55", rim:"17", type:"All Season",  price:148, fuel:"C", wet:"A", noise:71, load:98,  speed:"V", stock:22 },
  { id:18, brand:"Nokian",      name:"Snowproof P",            width:"235", aspect:"60", rim:"18", type:"Χειμερινό",   price:167, fuel:"C", wet:"A", noise:72, load:107, speed:"V", stock:0  },
];

const BRAND_ICONS = { Michelin:"🇫🇷", Continental:"🇩🇪", Bridgestone:"🇯🇵", Pirelli:"🇮🇹", Goodyear:"🇺🇸", Nokian:"🇫🇮", Hankook:"🇰🇷", Dunlop:"🇬🇧", Falken:"🇯🇵", Toyo:"🇯🇵" };
const WIDTHS  = ["175","185","195","205","215","225","235","245","255","265","275","285","295","305"];
const ASPECTS = ["35","40","45","50","55","60","65","70","75","80"];
const RIMS    = ["14","15","16","17","18","19","20","21","22"];
const TYPES   = ["Καλοκαιρινό","Χειμερινό","All Season"];
const BRANDS_LIST = ["Michelin","Continental","Bridgestone","Pirelli","Goodyear","Nokian","Hankook","Dunlop","Falken","Toyo","Kumho","Yokohama","Vredestein","BFGoodrich","Cooper","Άλλη μάρκα"];
const FUELS   = ["A","B","C","D","E"];
const WETS    = ["A","B","C","D","E"];
const SPEEDS  = ["R","H","T","V","W","Y"];
const FUEL_COLORS = { A:"#166534", B:"#15803d", C:"#92400e", D:"#991b1b", E:"#7f1d1d" };
const WET_COLORS  = { A:"#1e40af", B:"#1d4ed8", C:"#7e22ce", D:"#9d174d", E:"#7f1d1d" };
const BLANK = { brand:"", name:"", width:"", aspect:"", rim:"", type:"", price:"", stock:"", fuel:"A", wet:"A", noise:"70", load:"91", speed:"V", description:"" };
const DASHBOARD_PASSWORD = "2003";

function FilterGroup({ title, defaultOpen=false, count=0, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-group">
      <div className="fgh" onClick={()=>setOpen(o=>!o)}>
        <span className="fgh-label">{title}{count>0&&<span style={{color:"var(--red)",marginLeft:4}}>·{count}</span>}</span>
        <span className={`fgh-arrow ${open?"open":""}`}>▼</span>
      </div>
      {open && <div className="fgb">{children}</div>}
    </div>
  );
}
function CheckOpt({ label, count, checked, onChange }) {
  return (
    <div className="fo" onClick={onChange}>
      <div className={`fo-box ${checked?"chk":""}`}>{checked&&<span className="fo-chk">✓</span>}</div>
      <span className="fo-lbl">{label}</span>
      <span className="fo-cnt">{count}</span>
    </div>
  );
}

export default function App() {
  const [page, setPage]       = useState("home");
  const [dashTab, setDashTab] = useState("overview");
  const [tires, setTires]     = useState(INITIAL_TIRES);
  const [nextId, setNextId]   = useState(INITIAL_TIRES.length+1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Password gate
  const [showPwGate, setShowPwGate] = useState(false);
  const [pwValue, setPwValue]       = useState("");
  const [pwError, setPwError]       = useState("");
  const [pwVisible, setPwVisible]   = useState(false);
  const [pwShake, setPwShake]       = useState(false);
  const [dashUnlocked, setDashUnlocked] = useState(false);

  // Products
  const [search, setSearch]             = useState({ width:"", aspect:"", rim:"" });
  const [activeSearch, setActiveSearch] = useState(null);
  const [viewMode, setViewMode]         = useState("grid");
  const [sortBy, setSortBy]             = useState("relevance");
  const [brandSearch, setBrandSearch]   = useState("");
  const [filters, setFilters] = useState({ brands:[], types:[], priceMin:0, priceMax:300, widths:[], rims:[], fuel:[], wet:[], speed:[], maxNoise:75 });

  // Dashboard
  const [form, setForm]           = useState(BLANK);
  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast]         = useState(null);
  const [editTire, setEditTire]   = useState(null);
  const [delTire, setDelTire]     = useState(null);
  const [invSearch, setInvSearch] = useState("");
  const [dimSearch, setDimSearch] = useState({ width:"", aspect:"", rim:"" });
  const [dimApplied, setDimApplied] = useState(null);
  const [openBrands, setOpenBrands] = useState({});

  const toggleBrand = (b) => setOpenBrands(s=>({...s,[b]:!s[b]}));
  const toggle = (key, val) => setFilters(f=>({ ...f, [key]: f[key].includes(val)?f[key].filter(x=>x!==val):[...f[key],val] }));
  const setF = (k,v) => setForm(f=>({...f,[k]:v}));
  const showToast = (msg, sub="") => { setToast({msg,sub}); setTimeout(()=>setToast(null),3000); };

  const handleDashClick = () => {
    if(dashUnlocked) { setPage("dashboard"); setMenuOpen(false); }
    else { setShowPwGate(true); setPwValue(""); setPwError(""); setMenuOpen(false); }
  };

  const handlePwSubmit = () => {
    if(pwValue === DASHBOARD_PASSWORD) {
      setDashUnlocked(true);
      setShowPwGate(false);
      setPage("dashboard");
      setPwValue("");
      setPwError("");
    } else {
      setPwError("Λάθος κωδικός. Προσπαθήστε ξανά.");
      setPwShake(true);
      setTimeout(()=>setPwShake(false), 400);
    }
  };

  const validate = () => {
    const e={};
    if(!form.brand.trim())  e.brand="Επιλέξτε μάρκα";
    if(!form.name.trim())   e.name="Πληκτρολογήστε μοντέλο";
    if(!form.width)         e.width="Επιλέξτε πλάτος";
    if(!form.aspect)        e.aspect="Επιλέξτε ύψος";
    if(!form.rim)           e.rim="Επιλέξτε ζάντα";
    if(!form.type)          e.type="Επιλέξτε εποχή";
    if(!form.price||isNaN(+form.price)||+form.price<=0) e.price="Βάλτε τιμή σε €";
    if(form.stock===""||isNaN(+form.stock)||+form.stock<0) e.stock="Βάλτε αριθμό αποθέματος";
    setFormErrors(e);
    return Object.keys(e).length===0;
  };
  const handleAdd = () => {
    if(!validate()) return;
    const t={...form,id:nextId,price:+form.price,stock:+form.stock,noise:+form.noise,load:+form.load};
    setTires(ts=>[t,...ts]);
    setNextId(n=>n+1);
    setForm(BLANK);
    setFormErrors({});
    showToast("✅ Προστέθηκε!", `${form.brand} ${form.name} · ${form.width}/${form.aspect} R${form.rim}`);
    setDashTab("inventory");
  };
  const handleEditSave = () => {
    setTires(ts=>ts.map(x=>x.id===editTire.id?{...editTire,price:+editTire.price,stock:+editTire.stock,noise:+editTire.noise}:x));
    showToast("💾 Αποθηκεύτηκε!", `${editTire.brand} ${editTire.name}`);
    setEditTire(null);
  };
  const handleDelete = () => {
    setTires(ts=>ts.filter(x=>x.id!==delTire.id));
    showToast("🗑 Διαγράφηκε", delTire.name);
    setDelTire(null);
  };

  const filteredProducts = useMemo(()=>{
    let list = tires.filter(t=>{
      if(activeSearch?.width  && t.width !==activeSearch.width)  return false;
      if(activeSearch?.aspect && t.aspect!==activeSearch.aspect) return false;
      if(activeSearch?.rim    && t.rim   !==activeSearch.rim)    return false;
      if(filters.brands.length && !filters.brands.includes(t.brand)) return false;
      if(filters.types.length  && !filters.types.includes(t.type))   return false;
      if(t.price<filters.priceMin||t.price>filters.priceMax) return false;
      if(filters.widths.length && !filters.widths.includes(t.width)) return false;
      if(filters.rims.length   && !filters.rims.includes(t.rim))     return false;
      if(filters.fuel.length   && !filters.fuel.includes(t.fuel))    return false;
      if(filters.wet.length    && !filters.wet.includes(t.wet))      return false;
      if(filters.speed.length  && !filters.speed.includes(t.speed))  return false;
      if(t.noise>filters.maxNoise) return false;
      return true;
    });
    if(sortBy==="price_asc")  list=[...list].sort((a,b)=>a.price-b.price);
    if(sortBy==="price_desc") list=[...list].sort((a,b)=>b.price-a.price);
    if(sortBy==="name")       list=[...list].sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  },[tires,activeSearch,filters,sortBy]);

  const brandCounts = useMemo(()=>{ const c={}; tires.forEach(t=>{c[t.brand]=(c[t.brand]||0)+1;}); return c; },[tires]);
  const typeCounts  = useMemo(()=>{ const c={}; tires.forEach(t=>{c[t.type]=(c[t.type]||0)+1;});  return c; },[tires]);
  const widthCounts = useMemo(()=>{ const c={}; tires.forEach(t=>{c[t.width]=(c[t.width]||0)+1;}); return c; },[tires]);
  const rimCounts   = useMemo(()=>{ const c={}; tires.forEach(t=>{c[t.rim]=(c[t.rim]||0)+1;});    return c; },[tires]);

  const chips=[];
  if(activeSearch?.width)  chips.push({label:`Πλάτος ${activeSearch.width}`,clear:()=>setActiveSearch(s=>({...s,width:""}))});
  if(activeSearch?.aspect) chips.push({label:`Ύψος ${activeSearch.aspect}`, clear:()=>setActiveSearch(s=>({...s,aspect:""}))});
  if(activeSearch?.rim)    chips.push({label:`R${activeSearch.rim}`,        clear:()=>setActiveSearch(s=>({...s,rim:""}))});
  filters.brands.forEach(b=>chips.push({label:b,           clear:()=>toggle("brands",b)}));
  filters.types.forEach(t =>chips.push({label:t,           clear:()=>toggle("types",t)}));
  filters.widths.forEach(w =>chips.push({label:`${w}mm`,   clear:()=>toggle("widths",w)}));
  filters.rims.forEach(r   =>chips.push({label:`R${r}`,    clear:()=>toggle("rims",r)}));
  filters.fuel.forEach(g   =>chips.push({label:`Καύσιμο ${g}`,clear:()=>toggle("fuel",g)}));
  filters.wet.forEach(g    =>chips.push({label:`Υγρό ${g}`,  clear:()=>toggle("wet",g)}));
  filters.speed.forEach(g  =>chips.push({label:`Ταχ. ${g}`,  clear:()=>toggle("speed",g)}));
  if(filters.priceMin>0||filters.priceMax<300) chips.push({label:`${filters.priceMin}€–${filters.priceMax}€`,clear:()=>setFilters(f=>({...f,priceMin:0,priceMax:300}))});
  if(filters.maxNoise<75) chips.push({label:`≤${filters.maxNoise}dB`,clear:()=>setFilters(f=>({...f,maxNoise:75}))});
  const clearAll=()=>{setFilters({brands:[],types:[],priceMin:0,priceMax:300,widths:[],rims:[],fuel:[],wet:[],speed:[],maxNoise:75});setActiveSearch(null);};
  const searchLabel=activeSearch?[activeSearch.width,activeSearch.aspect,activeSearch.rim].filter(Boolean).join("/"):"";
  const filtBrands=[...new Set(tires.map(t=>t.brand))].sort().filter(b=>b.toLowerCase().includes(brandSearch.toLowerCase()));

  const totalV   = tires.reduce((s,t)=>s+t.price*t.stock,0);
  const outOfStk = tires.filter(t=>t.stock===0).length;
  const lowStk   = tires.filter(t=>t.stock>0&&t.stock<=3).length;
  const avgPrice = Math.round(tires.reduce((s,t)=>s+t.price,0)/tires.length);
  const brandBreakdown = useMemo(()=>{
    const c={}; tires.forEach(t=>{c[t.brand]=(c[t.brand]||0)+1;});
    return Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,7);
  },[tires]);
  const maxBC = brandBreakdown[0]?.[1]||1;

  const uniqueBrands = [...new Set(tires.map(t=>t.brand))].sort();
  const invFiltered = tires.filter(t=>{
    const textMatch = t.brand.toLowerCase().includes(invSearch.toLowerCase())||t.name.toLowerCase().includes(invSearch.toLowerCase());
    const dimMatch = !dimApplied || (
      (!dimApplied.width||t.width===dimApplied.width) &&
      (!dimApplied.aspect||t.aspect===dimApplied.aspect) &&
      (!dimApplied.rim||t.rim===dimApplied.rim)
    );
    return textMatch && dimMatch;
  });
  const filteredBrands = uniqueBrands.filter(b=>invFiltered.some(t=>t.brand===b));

  const formStep = useMemo(()=>{
    if(form.brand&&form.name) {
      if(form.width&&form.aspect&&form.rim&&form.type&&form.price&&form.stock) return 3;
      return 2;
    }
    return 1;
  },[form]);

  const SidebarContent = () => (
    <>
      <div className="sidebar-search">
        <input placeholder="🔍 Αναζήτηση μάρκας..." value={brandSearch} onChange={e=>setBrandSearch(e.target.value)}/>
      </div>
      <FilterGroup title="Εποχή" defaultOpen count={filters.types.length}>
        {TYPES.map(t=><CheckOpt key={t} label={t} count={typeCounts[t]||0} checked={filters.types.includes(t)} onChange={()=>toggle("types",t)}/>)}
      </FilterGroup>
      <FilterGroup title="Μάρκα" defaultOpen count={filters.brands.length}>
        {filtBrands.map(b=><CheckOpt key={b} label={b} count={brandCounts[b]||0} checked={filters.brands.includes(b)} onChange={()=>toggle("brands",b)}/>)}
      </FilterGroup>
      <FilterGroup title="Τιμή (€)" defaultOpen>
        <div className="price-display">
          <div className="price-val-box">{filters.priceMin}€</div>
          <div className="price-val-box">{filters.priceMax}€</div>
        </div>
        <div className="range-wrap">
          <div className="range-track-bg"/>
          <div className="range-track-fill" style={{left:`${(filters.priceMin/300)*100}%`,width:`${((filters.priceMax-filters.priceMin)/300)*100}%`}}/>
          <input type="range" className="range-inp" min={0} max={300} step={5} value={filters.priceMin} onChange={e=>setFilters(f=>({...f,priceMin:Math.min(+e.target.value,f.priceMax-10)}))}/>
          <input type="range" className="range-inp" min={0} max={300} step={5} value={filters.priceMax} onChange={e=>setFilters(f=>({...f,priceMax:Math.max(+e.target.value,f.priceMin+10)}))}/>
        </div>
      </FilterGroup>
      <FilterGroup title="Πλάτος (mm)" count={filters.widths.length}>
        {["205","215","225","235","245"].map(w=><CheckOpt key={w} label={`${w} mm`} count={widthCounts[w]||0} checked={filters.widths.includes(w)} onChange={()=>toggle("widths",w)}/>)}
      </FilterGroup>
      <FilterGroup title="Ζάντα (ίντσες)" count={filters.rims.length}>
        {["16","17","18","19"].map(r=><CheckOpt key={r} label={`R${r}`} count={rimCounts[r]||0} checked={filters.rims.includes(r)} onChange={()=>toggle("rims",r)}/>)}
      </FilterGroup>
      <FilterGroup title="Ενέργεια" count={filters.fuel.length}>
        <div className="rating-hint">A = καλύτερη κλάση</div>
        <div className="rating-row">
          {FUELS.map(g=><button key={g} className={`r-btn ${filters.fuel.includes(g)?"sel":""}`} style={filters.fuel.includes(g)?{background:FUEL_COLORS[g],borderColor:"transparent",color:"white"}:{}} onClick={()=>toggle("fuel",g)}>{g}</button>)}
        </div>
      </FilterGroup>
      <FilterGroup title="Πρόσφυση Υγρό" count={filters.wet.length}>
        <div className="rating-hint">A = καλύτερη πέδηση</div>
        <div className="rating-row">
          {WETS.map(g=><button key={g} className={`r-btn ${filters.wet.includes(g)?"sel":""}`} style={filters.wet.includes(g)?{background:WET_COLORS[g],borderColor:"transparent",color:"white"}:{}} onClick={()=>toggle("wet",g)}>{g}</button>)}
        </div>
      </FilterGroup>
      <FilterGroup title="Ταχύτητα" count={filters.speed.length}>
        <div className="rating-row">
          {SPEEDS.map(g=><button key={g} className={`r-btn ${filters.speed.includes(g)?"sel":""}`} style={filters.speed.includes(g)?{background:"var(--red)",borderColor:"transparent",color:"white"}:{}} onClick={()=>toggle("speed",g)}>{g}</button>)}
        </div>
      </FilterGroup>
      <FilterGroup title="Θόρυβος (dB)">
        <div className="noise-label">Μέγιστος: {filters.maxNoise} dB</div>
        <div className="range-wrap">
          <div className="range-track-bg"/>
          <div className="range-track-fill" style={{left:0,width:`${((filters.maxNoise-65)/10)*100}%`}}/>
          <input type="range" className="range-inp" min={65} max={75} step={1} value={filters.maxNoise} onChange={e=>setFilters(f=>({...f,maxNoise:+e.target.value}))}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          <span style={{fontSize:10,color:"#555"}}>65</span><span style={{fontSize:10,color:"#555"}}>75</span>
        </div>
      </FilterGroup>
    </>
  );

  return (
    <>
      <style>{style}</style>

      {/* PASSWORD GATE */}
      {showPwGate && (
        <div className="pw-overlay">
          <div className="pw-box">
            <div className="pw-icon">🔐</div>
            <h2>ΔΙΑΧΕΙΡΙΣΗ</h2>
            <p>Εισάγετε τον κωδικό πρόσβασης για να μπείτε στο διαχειριστικό panel.</p>
            <div className="pw-field">
              <input
                className={`pw-input ${pwShake?"err":""}`}
                type={pwVisible?"text":"password"}
                placeholder="••••"
                value={pwValue}
                onChange={e=>{ setPwValue(e.target.value); setPwError(""); }}
                onKeyDown={e=>e.key==="Enter"&&handlePwSubmit()}
                autoFocus
              />
              <button className="pw-toggle" onClick={()=>setPwVisible(v=>!v)}>
                {pwVisible?"🙈":"👁"}
              </button>
            </div>
            <div className="pw-err">{pwError}</div>
            <button className="pw-submit" onClick={handlePwSubmit}>ΕΙΣΟΔΟΣ →</button>
            <button className="pw-cancel" onClick={()=>{setShowPwGate(false);setPwValue("");setPwError("");}}>Ακύρωση</button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="toast">
          <span className="toast-ico">🛞</span>
          <div className="toast-msg">
            <strong>{toast.msg}</strong>
            {toast.sub&&<span>{toast.sub}</span>}
          </div>
          <button className="toast-close" onClick={()=>setToast(null)}>×</button>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {delTire && (
        <div className="overlay" onClick={()=>setDelTire(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()} style={{maxWidth:440}}>
            <div className="modal-hdr">
              <div><h2>🗑 ΔΙΑΓΡΑΦΗ</h2><p>Αυτή η ενέργεια δεν αναιρείται</p></div>
              <button className="modal-close" onClick={()=>setDelTire(null)}>×</button>
            </div>
            <div className="modal-bdy">
              <p style={{fontSize:15,color:"#ccc",lineHeight:1.6}}>
                Θέλετε σίγουρα να διαγράψετε το ελαστικό<br/>
                <strong style={{color:"var(--white)",fontSize:16}}>{delTire.brand} — {delTire.name}</strong>?
              </p>
              <p style={{marginTop:12,fontSize:13,color:"#555"}}>{delTire.width}/{delTire.aspect} R{delTire.rim} · {delTire.type}</p>
            </div>
            <div className="modal-ftr">
              <button className="modal-discard" onClick={()=>setDelTire(null)}>Ακύρωση</button>
              <button className="modal-delete" onClick={handleDelete}>🗑 Ναι, Διαγραφή</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editTire && (
        <div className="overlay" onClick={()=>setEditTire(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="modal-hdr">
              <div><h2>✏ ΕΠΕΞΕΡΓΑΣΙΑ</h2><p>{editTire.brand} — {editTire.name}</p></div>
              <button className="modal-close" onClick={()=>setEditTire(null)}>×</button>
            </div>
            <div className="modal-bdy">
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div className="mf" style={{gridColumn:"span 2"}}>
                  <label>Μοντέλο</label>
                  <input value={editTire.name} onChange={e=>setEditTire(t=>({...t,name:e.target.value}))}/>
                </div>
                <div className="mf"><label>💰 Τιμή (€)</label><input type="number" value={editTire.price} onChange={e=>setEditTire(t=>({...t,price:e.target.value}))}/></div>
                <div className="mf"><label>📦 Απόθεμα (τεμ.)</label><input type="number" value={editTire.stock} onChange={e=>setEditTire(t=>({...t,stock:e.target.value}))} min={0}/></div>
                <div className="mf"><label>🏷 Εποχή</label>
                  <select value={editTire.type} onChange={e=>setEditTire(t=>({...t,type:e.target.value}))}>
                    {TYPES.map(tp=><option key={tp}>{tp}</option>)}
                  </select>
                </div>
                <div className="mf"><label>🔊 Θόρυβος (dB)</label><input type="number" value={editTire.noise} onChange={e=>setEditTire(t=>({...t,noise:e.target.value}))} min={60} max={80}/></div>
                <div className="mf"><label>⛽ Ενέργεια</label>
                  <select value={editTire.fuel} onChange={e=>setEditTire(t=>({...t,fuel:e.target.value}))}>
                    {FUELS.map(f=><option key={f}>{f}</option>)}
                  </select>
                </div>
                <div className="mf"><label>💧 Υγρό</label>
                  <select value={editTire.wet} onChange={e=>setEditTire(t=>({...t,wet:e.target.value}))}>
                    {WETS.map(w=><option key={w}>{w}</option>)}
                  </select>
                </div>
              </div>
              <div style={{marginTop:16,padding:"12px 14px",background:"#0d0d0d",borderRadius:8,border:"1px solid #1e1e1e",fontSize:13,color:"#666"}}>
                📐 Διάσταση: <strong style={{color:"var(--accent)",fontFamily:"'Bebas Neue',sans-serif",fontSize:17,letterSpacing:1}}>{editTire.width}/{editTire.aspect} R{editTire.rim}</strong>
                <span style={{color:"#555"}}> · (Δεν μπορεί να αλλαχτεί)</span>
              </div>
            </div>
            <div className="modal-ftr">
              <button className="modal-discard" onClick={()=>setEditTire(null)}>Ακύρωση</button>
              <button className="modal-save" onClick={handleEditSave}>💾 Αποθήκευση</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ NAV ═══════════════ */}
      <nav className="nav">
        <div className="logo" onClick={()=>{setPage("home");setMenuOpen(false);}}>
          ΕΛΑΣΤΙΚΑ <span>ΓΙΟΒΑΝΗΣ</span>
          <small>Επαγγελματικά Ελαστικά</small>
        </div>
        <div className="nav-links">
          <a onClick={()=>setPage("home")} className={page==="home"?"act":""}>Αρχική</a>
          <a onClick={()=>setPage("products")} className={page==="products"?"act":""}>Προϊόντα</a>
          <a onClick={()=>{setPage("home"); setTimeout(()=>document.getElementById("services-section")?.scrollIntoView({behavior:"smooth"}),100);}}>Υπηρεσίες</a>
          <a onClick={()=>{setPage("home"); setTimeout(()=>document.getElementById("contact-section")?.scrollIntoView({behavior:"smooth"}),100);}}>Επικοινωνία</a>
          <button className={`nav-admin-btn ${page==="dashboard"?"act":""}`} onClick={handleDashClick}>
            🔧 Διαχείριση
          </button>
        </div>
        <button className={`hamburger ${menuOpen?"open":""}`} onClick={()=>setMenuOpen(o=>!o)}>
          <span/><span/><span/>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen?"open":""}`}>
        <a onClick={()=>{setPage("home");setMenuOpen(false);}}>Αρχική</a>
        <a onClick={()=>{setPage("products");setMenuOpen(false);}}>Προϊόντα</a>
        <a onClick={()=>{setPage("home");setMenuOpen(false);setTimeout(()=>document.getElementById("services-section")?.scrollIntoView({behavior:"smooth"}),150);}}>Υπηρεσίες</a>
        <a onClick={()=>{setPage("home");setMenuOpen(false);setTimeout(()=>document.getElementById("contact-section")?.scrollIntoView({behavior:"smooth"}),150);}}>Επικοινωνία</a>
        <button className="mob-admin" onClick={handleDashClick}>🔧 Διαχείριση</button>
      </div>

      {/* ═══════════════ HOME ═══════════════ */}
      {page==="home"&&(
        <>
          {/* HERO */}
          <section className="hero">
            <div className="hero-bg"/>
            <div className="tire-ring"/>
            <div className="hero-content">
              <div className="badge">🏎 Επαγγελματικά ελαστικά από το 1998</div>
              <h1>ΕΛΑΣΤΙΚΑ<br/><em>ΓΙΟΒΑΝΗΣ</em></h1>
              <p>Βρείτε το ιδανικό ελαστικό για το όχημά σας. Τεράστια επιλογή από τις κορυφαίες μάρκες, σε ανταγωνιστικές τιμές.</p>
              <div className="search-card">
                <h2>🔍 Αναζήτηση με διαστάσεις ελαστικού</h2>
                <div className="search-row">
                  <div className="field"><label>Πλάτος (mm)</label>
                    <select value={search.width} onChange={e=>setSearch(s=>({...s,width:e.target.value}))}>
                      <option value="">π.χ. 225</option>{WIDTHS.map(w=><option key={w}>{w}</option>)}
                    </select>
                  </div>
                  <div className="field"><label>Σχέση ύψους (%)</label>
                    <select value={search.aspect} onChange={e=>setSearch(s=>({...s,aspect:e.target.value}))}>
                      <option value="">π.χ. 45</option>{ASPECTS.map(a=><option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="field"><label>Διάμετρος (ίντσες)</label>
                    <select value={search.rim} onChange={e=>setSearch(s=>({...s,rim:e.target.value}))}>
                      <option value="">π.χ. 17</option>{RIMS.map(r=><option key={r}>R{r}</option>)}
                    </select>
                  </div>
                  <button className="search-btn" onClick={()=>{setActiveSearch({...search});setPage("products");}}>ΑΝΑΖΗΤΗΣΗ</button>
                </div>
              </div>
            </div>
            <div className="stats">
              <div className="stat"><div className="stat-num">{tires.length}+</div><div className="stat-label">Προϊόντα</div></div>
              <div className="stat"><div className="stat-num">15+</div><div className="stat-label">Μάρκες</div></div>
              <div className="stat"><div className="stat-num">24ΩΡΟ</div><div className="stat-label">Εξυπηρέτηση</div></div>
              <div className="stat"><div className="stat-num">25+</div><div className="stat-label">Χρόνια</div></div>
            </div>
          </section>

          {/* BRANDS */}
          <section className="brands-section">
            <h3>Συνεργαζόμαστε με</h3>
            <div className="brands-row">
              {["MICHELIN","CONTINENTAL","BRIDGESTONE","PIRELLI","GOODYEAR","NOKIAN","HANKOOK"].map(b=>(
                <div key={b} className="brand-name-s">{b}</div>
              ))}
            </div>
          </section>

          {/* WHY US */}
          <section className="why-section">
            <div className="sec-header">
              <div className="eyebrow">Γιατί Εμάς</div>
              <h2>ΕΜΠΙΣΤΟΣΥΝΗ ΠΟΥ<br/>ΚΡΑΤΑ ΔΕΚΑΕΤΙΕΣ</h2>
              <p>Από το 1998 εξυπηρετούμε χιλιάδες πελάτες σε όλη την Ελλάδα με επαγγελματισμό και γνώση.</p>
            </div>
            <div className="why-grid">
              {[
                { icon:"🏆", title:"25 Χρόνια Εμπειρίας", text:"Δεκαετίες εξειδίκευσης στον κλάδο ελαστικών. Γνωρίζουμε κάθε μάρκα, κάθε μοντέλο, κάθε εποχή." },
                { icon:"💰", title:"Ανταγωνιστικές Τιμές", text:"Άμεσες συμφωνίες με τους κατασκευαστές μας επιτρέπουν να σας δίνουμε τις καλύτερες τιμές της αγοράς." },
                { icon:"🚗", title:"Δωρεάν Τοποθέτηση", text:"Αγοράστε ελαστικά και η τοποθέτηση στο κατάστημά μας είναι εντελώς δωρεάν." },
                { icon:"🔧", title:"Επαγγελματικό Συνεργείο", text:"Εξοπλισμένο συνεργείο με τελευταίας τεχνολογίας μηχανήματα ζυγοστάθμισης και τοποθέτησης." },
                { icon:"📦", title:"Άμεση Διαθεσιμότητα", text:"Τεράστια αποθήκη με εκατοντάδες μοντέλα σε stock. Παραλαβή ίδια μέρα για τα περισσότερα." },
                { icon:"⭐", title:"Εγγύηση Ικανοποίησης", text:"Αν δεν είστε ικανοποιημένοι, βρίσκουμε λύση. Πάντα. Γιατί ο πελάτης μας είναι το παν." },
              ].map((c,i)=>(
                <div key={i} className="why-card">
                  <div className="why-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SERVICES */}
          <section className="services-section" id="services-section">
            <div className="sec-header">
              <div className="eyebrow">Υπηρεσίες</div>
              <h2>ΟΛΑ ΟΣΑ ΧΡΕΙΑΖΕΣΤΕ</h2>
            </div>
            <div className="services-grid">
              {[
                { icon:"🛞", title:"Πώληση Ελαστικών", text:"Τεράστια γκάμα ελαστικών από τις κορυφαίες μάρκες. Καλοκαιρινά, χειμερινά και all season σε όλες τις διαστάσεις." },
                { icon:"⚖️", title:"Ζυγοστάθμιση Τροχών", text:"Επαγγελματική ζυγοστάθμιση με σύγχρονα μηχανήματα για ομαλή οδήγηση και μεγαλύτερη διάρκεια ελαστικών." },
                { icon:"🔄", title:"Εποχιακή Αλλαγή", text:"Αποθηκεύστε τα ελαστικά σας εκτός εποχής στις κλιματιζόμενες αποθήκες μας. Ασφαλής φύλαξη ολόχρονα." },
                { icon:"🩺", title:"Εκτίμηση & Συμβουλές", text:"Δωρεάν εκτίμηση κατάστασης ελαστικών και αμερόληπτες συμβουλές για την ιδανική επιλογή για το όχημά σας." },
              ].map((s,i)=>(
                <div key={i} className="service-card">
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-body"><h3>{s.title}</h3><p>{s.text}</p></div>
                </div>
              ))}
            </div>
          </section>

          {/* REVIEWS */}
          <section className="reviews-section">
            <div className="sec-header">
              <div className="eyebrow">Κριτικές Πελατών</div>
              <h2>ΤΙ ΛΕΝΕ ΟΙ ΠΕΛΑΤΕΣ ΜΑΣ</h2>
            </div>
            <div className="reviews-grid">
              {[
                { stars:"★★★★★", text:"Εξαιρετική εξυπηρέτηση! Βρήκα αμέσως αυτό που ήθελα για το BMW μου σε πολύ καλή τιμή. Θα επιστρέψω σίγουρα.", name:"Νίκος Π.", car:"BMW 320i" },
                { stars:"★★★★★", text:"Επαγγελματισμός σε κάθε επίπεδο. Με βοήθησαν να επιλέξω τα σωστά χειμερινά ελαστικά για τις συνθήκες του βουνού.", name:"Μαρία Κ.", car:"Toyota RAV4" },
                { stars:"★★★★★", text:"Τιμές που δεν βρίσκεις αλλού! Πήρα 4 Michelin Pilot Sport και τοποθετήθηκαν την ίδια μέρα. Άψογη δουλειά!", name:"Σταύρος Α.", car:"Audi A4" },
              ].map((r,i)=>(
                <div key={i} className="review-card">
                  <div className="review-stars">{r.stars}</div>
                  <p className="review-text">"{r.text}"</p>
                  <div className="review-author">
                    <div className="review-avatar">{r.name[0]}</div>
                    <div><div className="review-name">{r.name}</div><div className="review-car">{r.car}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="cta-strip">
            <h2>ΕΤΟΙΜΟΙ ΓΙΑ ΝΕΑ<br/>ΕΛΑΣΤΙΚΑ;</h2>
            <p>Αναζητήστε τώρα από τον κατάλογό μας ή επικοινωνήστε μαζί μας για προσωπική εξυπηρέτηση.</p>
            <div className="cta-btn-row">
              <button className="cta-primary" onClick={()=>setPage("products")}>ΔΕΙΤΕ ΤΟΝ ΚΑΤΑΛΟΓΟ</button>
              <button className="cta-secondary" onClick={()=>document.getElementById("contact-section")?.scrollIntoView({behavior:"smooth"})}>Επικοινωνία</button>
            </div>
          </section>

          {/* CONTACT */}
          <section className="contact-section" id="contact-section">
            <div className="sec-header">
              <div className="eyebrow">Επικοινωνία</div>
              <h2>ΒΡΕΙΤΕ ΜΑΣ</h2>
            </div>
            <div className="contact-grid">
              <div className="contact-info">
                {[
                  { icon:"📍", title:"Διεύθυνση", text:"Λεωφ. Αθηνών 142, Αθήνα 10441\nΔίπλα στο Μετρό Κεραμεικός" },
                  { icon:"📞", title:"Τηλέφωνο", text:"210 123 4567\nΔευτ–Σάβ: 08:00–20:00" },
                  { icon:"✉️", title:"Email", text:"info@elastika-giovanis.gr" },
                  { icon:"🕐", title:"Ωράριο", text:"Δευτέρα–Παρασκευή: 08:00–20:00\nΣάββατο: 08:00–15:00" },
                ].map((c,i)=>(
                  <div key={i} className="contact-item">
                    <div className="contact-ico">{c.icon}</div>
                    <div className="contact-detail">
                      <h4>{c.title}</h4>
                      <p style={{whiteSpace:"pre-line"}}>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="contact-form-card">
                <h3>📩 Στείλτε μήνυμα</h3>
                <div className="cf-field"><label>Ονοματεπώνυμο</label><input placeholder="π.χ. Νίκος Παπαδόπουλος"/></div>
                <div className="cf-field"><label>Τηλέφωνο / Email</label><input placeholder="Πώς να σας καλέσουμε;"/></div>
                <div className="cf-field"><label>Μήνυμα</label><textarea placeholder="Γράψτε το αίτημά σας..."/></div>
                <button className="cf-submit" onClick={()=>showToast("📨 Εστάλη!", "Θα επικοινωνήσουμε σύντομα.")}>Αποστολή</button>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="logo" style={{cursor:"default",fontSize:18}}>ΕΛΑΣΤΙΚΑ <span style={{color:"var(--red)"}}>ΓΙΟΒΑΝΗΣ</span><small style={{display:"block",fontFamily:"Outfit",fontSize:9,letterSpacing:3,color:"var(--gray-light)",textTransform:"uppercase",fontWeight:500}}>Επαγγελματικά Ελαστικά</small></div>
                <p>Από το 1998 προσφέρουμε αξιόπιστα ελαστικά και επαγγελματική εξυπηρέτηση σε όλη την Ελλάδα.</p>
              </div>
              <div className="footer-col">
                <h4>Πλοήγηση</h4>
                <a onClick={()=>setPage("home")}>Αρχική</a>
                <a onClick={()=>setPage("products")}>Προϊόντα</a>
                <a onClick={()=>document.getElementById("services-section")?.scrollIntoView({behavior:"smooth"})}>Υπηρεσίες</a>
                <a onClick={()=>document.getElementById("contact-section")?.scrollIntoView({behavior:"smooth"})}>Επικοινωνία</a>
              </div>
              <div className="footer-col">
                <h4>Μάρκες</h4>
                {["Michelin","Continental","Pirelli","Goodyear","Bridgestone"].map(b=><a key={b}>{b}</a>)}
              </div>
            </div>
            <div className="footer-bottom">
              <span className="footer-copy">© 2025 Ελαστικά Γιοβάνης. Όλα τα δικαιώματα διατηρούνται.</span>
              <span className="footer-made">Αθήνα, Ελλάδα 🇬🇷</span>
            </div>
          </footer>
        </>
      )}

      {/* ═══════════════ PRODUCTS ═══════════════ */}
      {page==="products"&&(
        <div className="products-page">
          <div className="products-topbar">
            <button className="back-btn" onClick={()=>setPage("home")}>← Πίσω</button>
            <div className="topbar-title">ΕΛΑΣΤΙΚΑ {searchLabel&&<span>{searchLabel}</span>}</div>
            <div className="topbar-right">
              <button className="mob-filter-btn" onClick={()=>setSidebarOpen(true)}>⚙ Φίλτρα {chips.length>0&&`(${chips.length})`}</button>
              <span className="topbar-count">{filteredProducts.length} αποτελέσματα</span>
              <select className="sort-select" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="relevance">Σχετικότητα</option>
                <option value="price_asc">Τιμή: Χαμηλότερη</option>
                <option value="price_desc">Τιμή: Υψηλότερη</option>
                <option value="name">Αλφαβητικά</option>
              </select>
            </div>
          </div>
          {chips.length>0&&(
            <div className="active-filters">
              <span className="active-label">Φίλτρα:</span>
              {chips.map((c,i)=><div key={i} className="af-chip" onClick={c.clear}>{c.label}<span className="af-x">×</span></div>)}
              <button className="clear-all-btn" onClick={clearAll}>Καθαρισμός όλων</button>
            </div>
          )}
          <div className="products-layout">
            {/* Mobile filter overlay */}
            <div className={`mob-filter-overlay ${sidebarOpen?"open":""}`} onClick={()=>setSidebarOpen(false)}/>
            <div className={`sidebar ${sidebarOpen?"mob-open":""}`}>
              {sidebarOpen&&<div style={{padding:"12px 14px",borderBottom:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:700,fontSize:14}}>Φίλτρα</span>
                <button onClick={()=>setSidebarOpen(false)} style={{background:"none",border:"none",color:"#888",fontSize:20,cursor:"pointer"}}>×</button>
              </div>}
              <SidebarContent/>
            </div>
            <div className="products-main">
              <div className="view-row">
                <span style={{fontSize:13,color:"#555",marginRight:"auto"}}>{filteredProducts.length} αποτελέσματα</span>
                <button className={`view-btn ${viewMode==="grid"?"active":""}`} onClick={()=>setViewMode("grid")}>⊞ Grid</button>
                <button className={`view-btn ${viewMode==="list"?"active":""}`} onClick={()=>setViewMode("list")}>☰ Λίστα</button>
              </div>
              {filteredProducts.length===0?(
                <div className="no-results">
                  <div className="emoji">🔍</div>
                  <h3>Δεν βρέθηκαν ελαστικά</h3>
                  <p>Δοκιμάστε να αλλάξετε τα φίλτρα.</p>
                  <button className="buy-btn" style={{marginTop:20,padding:"9px 22px"}} onClick={clearAll}>Καθαρισμός φίλτρων</button>
                </div>
              ):(
                <div className={`products-grid ${viewMode==="list"?"list":""}`}>
                  {filteredProducts.map(t=>(
                    <div key={t.id} className={`product-card ${viewMode==="list"?"lc":""}`}>
                      <div className="product-img">🛞</div>
                      <div className="product-info">
                        <div className="brand-tag">{t.brand}</div>
                        <div className="product-name">{t.name}</div>
                        <div className="product-dim">{t.width}/{t.aspect} R{t.rim} · {t.type}</div>
                        <div className="label-row">
                          <span className={`lbadge lb-f-${t.fuel}`}>⛽{t.fuel}</span>
                          <span className={`lbadge lb-w-${t.wet}`}>💧{t.wet}</span>
                          <span className="lbadge lb-noise">🔊{t.noise}dB</span>
                          <span className="lbadge lb-info">{t.load}/{t.speed}</span>
                        </div>
                        <div className="product-footer">
                          <div className="price">{t.price}€ <span>/τεμ.</span></div>
                          <button className="buy-btn">Αγορά</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ DASHBOARD ═══════════════ */}
      {page==="dashboard"&&(
        <div className="dash-wrap">
          <div className="dash-sidenav">
            <div className="dash-sidenav-title">
              <div className="logo" style={{fontSize:16,letterSpacing:2,cursor:"default"}}>ΕΛΑΣΤΙΚΑ <span style={{color:"var(--red)"}}>ΓΙΟΒΑΝΗΣ</span><small style={{display:"block",fontFamily:"Outfit",fontSize:9,letterSpacing:3,color:"var(--gray-light)",textTransform:"uppercase",fontWeight:500}}>Διαχείριση</small></div>
            </div>
            {[
              { id:"overview",  icon:"📊", label:"Επισκόπηση"    },
              { id:"add",       icon:"➕", label:"Νέο Ελαστικό"  },
              { id:"inventory", icon:"📦", label:"Αποθήκη"       },
            ].map(item=>(
              <button key={item.id} className={`dash-nav-btn ${dashTab===item.id?"dn-act":""}`} onClick={()=>setDashTab(item.id)}>
                <span className="dash-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="dash-sidenav-footer">
              <strong>{tires.length} ελαστικά</strong> στον κατάλογο<br/>
              <strong style={{color:outOfStk>0?"#fb923c":"#4ade80"}}>{outOfStk}</strong> εκτός αποθέματος
            </div>
          </div>

          <div className="dash-body">
            {/* OVERVIEW */}
            {dashTab==="overview"&&(
              <>
                <div className="dash-page-title">
                  <h1>📊 ΕΠΙΣΚΟΠΗΣΗ</h1>
                  <p>Γεια σου! Εδώ βλέπεις μια σύνοψη της αποθήκης σου.</p>
                </div>
                {(outOfStk>0||lowStk>0)&&(
                  <div className="alert-strip">
                    <span className="alert-strip-icon">⚠️</span>
                    <div className="alert-strip-text">
                      <strong>{outOfStk} ελαστικά εκτός αποθέματος</strong> και {lowStk} με χαμηλό απόθεμα.
                    </div>
                    <button className="alert-strip-btn" onClick={()=>setDashTab("inventory")}>Δες τα →</button>
                  </div>
                )}
                <div className="kpi-grid">
                  <div className="kpi kpi-r"><div className="kpi-ico">🛞</div><div className="kpi-n">{tires.length}</div><div className="kpi-lbl">Σύνολο προϊόντων</div><div className="kpi-note ok">✓ Ενημερωμένος κατάλογος</div></div>
                  <div className="kpi kpi-g"><div className="kpi-ico">💰</div><div className="kpi-n">{totalV.toLocaleString("el")}€</div><div className="kpi-lbl">Αξία αποθήκης</div><div className="kpi-note ok">↑ Τρέχουσα αξία</div></div>
                  <div className="kpi kpi-o"><div className="kpi-ico">📉</div><div className="kpi-n">{outOfStk}</div><div className="kpi-lbl">Εκτός αποθέματος</div><div className={`kpi-note ${outOfStk>2?"warn":"ok"}`}>{outOfStk>2?"⚠ Χρειάζεται προσοχή":"✓ Υπό έλεγχο"}</div></div>
                  <div className="kpi kpi-b"><div className="kpi-ico">📊</div><div className="kpi-n">{avgPrice}€</div><div className="kpi-lbl">Μέση τιμή</div><div className="kpi-note ok">↑ Ανταγωνιστική</div></div>
                </div>
                <div className="two-col">
                  <div className="panel">
                    <div className="panel-head"><h3>📦 Ανά Μάρκα</h3></div>
                    <div className="panel-body">
                      <div className="bbar">
                        {brandBreakdown.map(([brand,count])=>(
                          <div key={brand} className="bbar-row">
                            <span className="bbar-lbl">{brand}</span>
                            <div className="bbar-bg"><div className="bbar-fill" style={{width:`${(count/maxBC)*100}%`}}/></div>
                            <span className="bbar-cnt">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="panel">
                    <div className="panel-head"><h3>⚡ Δραστηριότητα</h3></div>
                    <div className="panel-body">
                      <div className="act-list">
                        {[
                          {dot:"dot-g",text:<><strong>Michelin Pilot Sport 5</strong> — Νέο απόθεμα (12 τεμ.)</>,time:"Σήμερα 10:32"},
                          {dot:"dot-r",text:<><strong>Bridgestone Turanza</strong> — Εξαντλήθηκε</>,time:"Σήμερα 09:14"},
                          {dot:"dot-b",text:<><strong>Pirelli P Zero</strong> — Τιμή: 210€</>,time:"Χθες 17:45"},
                          {dot:"dot-o",text:<><strong>Hankook Ventus</strong> — Προστέθηκε νέο</>,time:"Χθες 14:20"},
                          {dot:"dot-g",text:<><strong>Continental Winter</strong> — Παραγγελία 20 τεμ.</>,time:"22/02 11:00"},
                        ].map((a,i)=>(
                          <div key={i} className="act-item">
                            <div className={`act-dot ${a.dot}`}/>
                            <span className="act-text">{a.text}</span>
                            <span className="act-time">{a.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {(outOfStk>0||lowStk>0)&&(
                  <div className="panel">
                    <div className="panel-head"><h3>🚨 Χρειάζονται Προσοχή</h3><button className="panel-head-action" onClick={()=>setDashTab("inventory")}>Επεξεργασία →</button></div>
                    <div className="panel-body" style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                      {tires.filter(t=>t.stock<=3).map(t=>(
                        <div key={t.id} style={{background:"#0d0d0d",border:"1px solid #1e1e1e",borderRadius:10,padding:"14px 18px",minWidth:160}}>
                          <div style={{fontSize:10,color:"var(--red)",textTransform:"uppercase",letterSpacing:1,fontWeight:700,marginBottom:4}}>{t.brand}</div>
                          <div style={{fontSize:14,fontWeight:600,marginBottom:6}}>{t.name}</div>
                          <div style={{fontSize:12,color:"#555",marginBottom:10}}>{t.width}/{t.aspect} R{t.rim}</div>
                          <span className={`tire-stock-badge ${t.stock===0?"s-out":"s-low"}`}>{t.stock===0?"Εξαντλήθηκε":`${t.stock} τεμ. απομένουν`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ADD */}
            {dashTab==="add"&&(
              <>
                <div className="dash-page-title"><h1>➕ ΝΕΟ ΕΛΑΣΤΙΚΟ</h1><p>Συμπλήρωσε τα στοιχεία παρακάτω.</p></div>
                <div className="add-form-wrap">
                  <div className="add-form-hero">
                    <div className="add-form-hero-icon">🛞</div>
                    <div>
                      <h2>ΦΟΡΜΑ ΠΡΟΣΘΗΚΗΣ</h2>
                      <p>Βήμα {formStep} από 3 — {formStep===1?"Βασικά στοιχεία":formStep===2?"Διαστάσεις & Τιμή":"Έτοιμο να αποθηκευτεί!"}</p>
                    </div>
                  </div>
                  <div className="form-body">
                    <div className="steps">
                      {["Βασικά","Διαστάσεις","Ολοκλήρωση"].map((s,i)=>(
                        <React.Fragment key={i}>
                          <div className="step">
                            <div className={`step-num ${formStep>i+1?"done":formStep===i+1?"current":""}`}>{formStep>i+1?"✓":i+1}</div>
                            <span className={`step-lbl ${formStep>i+1?"done":formStep===i+1?"current":""}`}>{s}</span>
                          </div>
                          {i<2&&<div className={`step-line ${formStep>i+1?"done":""}`}/>}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="sec-title">1. Βασικές Πληροφορίες</div>
                    <div className="fg2">
                      <div className="big-field">
                        <label className="big-label">Μάρκα <span className="req">*</span></label>
                        <p className="big-hint">Επίλεξε τη μάρκα</p>
                        <select className={`big-select ${formErrors.brand?"err":""}`} value={form.brand} onChange={e=>setF("brand",e.target.value)}>
                          <option value="">👇 Επίλεξε μάρκα...</option>
                          {BRANDS_LIST.map(b=><option key={b}>{b}</option>)}
                        </select>
                        {formErrors.brand&&<span className="err-msg">⚠ {formErrors.brand}</span>}
                      </div>
                      <div className="big-field">
                        <label className="big-label">Μοντέλο <span className="req">*</span></label>
                        <p className="big-hint">π.χ. Pilot Sport 5</p>
                        <input className={`big-input ${formErrors.name?"err":""}`} placeholder="Γράψε το μοντέλο..." value={form.name} onChange={e=>setF("name",e.target.value)}/>
                        {formErrors.name&&<span className="err-msg">⚠ {formErrors.name}</span>}
                      </div>
                    </div>
                    <div className="big-field">
                      <label className="big-label">Περιγραφή <span style={{color:"#555",fontSize:12,fontWeight:400}}>(προαιρετικό)</span></label>
                      <textarea className="big-textarea" placeholder="Σύντομη περιγραφή..." value={form.description} onChange={e=>setF("description",e.target.value)}/>
                    </div>
                    <div className="sec-div"/>
                    <div className="sec-title">2. Διαστάσεις</div>
                    <div className="fg3">
                      <div className="big-field">
                        <label className="big-label">Πλάτος (mm) <span className="req">*</span></label>
                        <select className={`big-select ${formErrors.width?"err":""}`} value={form.width} onChange={e=>setF("width",e.target.value)}>
                          <option value="">Επίλεξε...</option>{WIDTHS.map(w=><option key={w}>{w}</option>)}
                        </select>
                        {formErrors.width&&<span className="err-msg">⚠ {formErrors.width}</span>}
                      </div>
                      <div className="big-field">
                        <label className="big-label">Ύψος (%) <span className="req">*</span></label>
                        <select className={`big-select ${formErrors.aspect?"err":""}`} value={form.aspect} onChange={e=>setF("aspect",e.target.value)}>
                          <option value="">Επίλεξε...</option>{ASPECTS.map(a=><option key={a}>{a}</option>)}
                        </select>
                        {formErrors.aspect&&<span className="err-msg">⚠ {formErrors.aspect}</span>}
                      </div>
                      <div className="big-field">
                        <label className="big-label">Ζάντα (ίντσες) <span className="req">*</span></label>
                        <select className={`big-select ${formErrors.rim?"err":""}`} value={form.rim} onChange={e=>setF("rim",e.target.value)}>
                          <option value="">Επίλεξε...</option>{RIMS.map(r=><option key={r}>R{r}</option>)}
                        </select>
                        {formErrors.rim&&<span className="err-msg">⚠ {formErrors.rim}</span>}
                      </div>
                    </div>
                    {form.width&&form.aspect&&form.rim&&(
                      <div className="dim-preview">
                        <span className="dim-preview-label">📐 Η διάσταση σου:</span>
                        <span className="dim-preview-val">{form.width}/{form.aspect} R{form.rim.replace("R","")}</span>
                      </div>
                    )}
                    <div className="sec-div"/>
                    <div className="sec-title">3. Εποχή, Τιμή & Απόθεμα</div>
                    <div className="fg3">
                      <div className="big-field">
                        <label className="big-label">Εποχή <span className="req">*</span></label>
                        <select className={`big-select ${formErrors.type?"err":""}`} value={form.type} onChange={e=>setF("type",e.target.value)}>
                          <option value="">Επίλεξε...</option>{TYPES.map(t=><option key={t}>{t}</option>)}
                        </select>
                        {formErrors.type&&<span className="err-msg">⚠ {formErrors.type}</span>}
                      </div>
                      <div className="big-field">
                        <label className="big-label">💰 Τιμή (€) <span className="req">*</span></label>
                        <input type="number" className={`big-input ${formErrors.price?"err":""}`} placeholder="π.χ. 149" value={form.price} onChange={e=>setF("price",e.target.value)} min={1}/>
                        {formErrors.price&&<span className="err-msg">⚠ {formErrors.price}</span>}
                      </div>
                      <div className="big-field">
                        <label className="big-label">📦 Απόθεμα <span className="req">*</span></label>
                        <input type="number" className={`big-input ${formErrors.stock?"err":""}`} placeholder="π.χ. 10" value={form.stock} onChange={e=>setF("stock",e.target.value)} min={0}/>
                        {formErrors.stock&&<span className="err-msg">⚠ {formErrors.stock}</span>}
                      </div>
                    </div>
                    <div className="sec-div"/>
                    <div className="sec-title">4. Ετικέτες EU <span style={{color:"#555",fontSize:11,fontWeight:400,textTransform:"none"}}>· προαιρετικό</span></div>
                    <div className="fg3">
                      <div className="big-field">
                        <label className="big-label">⛽ Κατανάλωση</label>
                        <div className="pill-row">{FUELS.map(g=><button key={g} type="button" className={`pill ${form.fuel===g?"psel":""}`} style={form.fuel===g?{background:FUEL_COLORS[g]}:{}} onClick={()=>setF("fuel",g)}>{g}</button>)}</div>
                      </div>
                      <div className="big-field">
                        <label className="big-label">💧 Υγρό Δρόμο</label>
                        <div className="pill-row">{WETS.map(g=><button key={g} type="button" className={`pill ${form.wet===g?"psel":""}`} style={form.wet===g?{background:WET_COLORS[g]}:{}} onClick={()=>setF("wet",g)}>{g}</button>)}</div>
                      </div>
                      <div className="big-field">
                        <label className="big-label">🔊 Θόρυβος (dB)</label>
                        <input type="number" className="big-input" min={60} max={80} value={form.noise} onChange={e=>setF("noise",e.target.value)}/>
                      </div>
                    </div>
                    <div className="sec-div"/>
                    {Object.keys(formErrors).length>0&&(
                      <div className="form-err-banner" style={{marginBottom:16}}>⚠️ Παρακαλώ συμπλήρωσε τα υποχρεωτικά πεδία.</div>
                    )}
                    <div className="submit-row">
                      <button className="big-submit" onClick={handleAdd}>✅ ΠΡΟΣΘΗΚΗ ΕΛΑΣΤΙΚΟΥ</button>
                      <button className="big-cancel" onClick={()=>{setForm(BLANK);setFormErrors({});}}>🔄 Καθαρισμός</button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* INVENTORY */}
            {dashTab==="inventory"&&(
              <>
                <div className="dash-page-title"><h1>📦 ΑΠΟΘΗΚΗ</h1><p>Επεξεργαστείτε ή διαγράψτε ελαστικά.</p></div>
                <div style={{background:"#111",border:"1px solid #1e1e1e",borderRadius:12,padding:"20px 22px",marginBottom:20}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:1.5,marginBottom:14}}>🔍 Αναζήτηση</div>
                  <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"flex-end"}}>
                    <div style={{flex:"1 1 200px"}}>
                      <div style={{fontSize:12,color:"#666",marginBottom:7,fontWeight:600}}>Αναζήτηση με όνομα / μάρκα</div>
                      <input className="big-search" placeholder="π.χ. Michelin..." value={invSearch} onChange={e=>setInvSearch(e.target.value)}/>
                    </div>
                    <div style={{flex:"2 1 280px"}}>
                      <div style={{fontSize:12,color:"#666",marginBottom:7,fontWeight:600}}>Αναζήτηση με διαστάσεις</div>
                      <div className="dim-search-row">
                        <input className="dim-inp" placeholder="225" value={dimSearch.width} onChange={e=>setDimSearch(s=>({...s,width:e.target.value}))} maxLength={3}/>
                        <span className="dim-sep">/</span>
                        <input className="dim-inp" placeholder="45" value={dimSearch.aspect} onChange={e=>setDimSearch(s=>({...s,aspect:e.target.value}))} maxLength={2}/>
                        <span className="dim-sep">R</span>
                        <input className="dim-inp" placeholder="17" value={dimSearch.rim} onChange={e=>setDimSearch(s=>({...s,rim:e.target.value}))} maxLength={2}/>
                        <button className="dim-search-btn" onClick={()=>setDimApplied({...dimSearch})}>🔍 Εύρεση</button>
                        {dimApplied&&<button className="dim-clear-btn" onClick={()=>{setDimApplied(null);setDimSearch({width:"",aspect:"",rim:""});}}>✕</button>}
                      </div>
                    </div>
                    <button className="big-submit" style={{fontSize:15,padding:"12px 20px",borderRadius:8,flexShrink:0}} onClick={()=>setDashTab("add")}>➕ Νέο</button>
                  </div>
                </div>
                {filteredBrands.length===0?(
                  <div className="empty-state"><div className="es-ico">🔍</div><h3>Δεν βρέθηκαν αποτελέσματα</h3><p>Δοκίμασε διαφορετικά κριτήρια.</p></div>
                ):(
                  <div className="brand-accordion">
                    {filteredBrands.map(brand=>{
                      const brandTires=invFiltered.filter(t=>t.brand===brand);
                      const brandOut=brandTires.filter(t=>t.stock===0).length;
                      const isOpen=openBrands[brand]!==false;
                      return (
                        <div key={brand} className="brand-block">
                          <div className="brand-block-header" onClick={()=>toggleBrand(brand)}>
                            <div className="brand-logo-circle">{BRAND_ICONS[brand]||"🛞"}</div>
                            <div className="brand-block-info">
                              <div className="brand-block-name">{brand}</div>
                              <div className="brand-block-sub">{brandTires.length} ελαστικά</div>
                            </div>
                            <div className="brand-block-badges">
                              <span className="brand-count-badge">{brandTires.length} τεμ.</span>
                              {brandOut>0&&<span className="brand-out-badge">⚠ {brandOut} εκτός</span>}
                            </div>
                            <span className={`brand-block-arrow ${isOpen?"open":""}`}>▼</span>
                          </div>
                          {isOpen&&(
                            <div className="brand-tire-list">
                              {brandTires.map(t=>(
                                <div key={t.id} className="tire-row">
                                  <div className="tire-row-icon">🛞</div>
                                  <div className="tire-row-info">
                                    <div className="tire-row-name">{t.name}</div>
                                    <div className="tire-row-dim">📐 {t.width}/{t.aspect} R{t.rim}</div>
                                    <div className="tire-row-type">🏷 {t.type}</div>
                                  </div>
                                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                                    <span className={`lbadge lb-f-${t.fuel}`}>⛽{t.fuel}</span>
                                    <span className={`lbadge lb-w-${t.wet}`}>💧{t.wet}</span>
                                  </div>
                                  <div className="tire-row-price">{t.price}€</div>
                                  <span className={`tire-stock-badge ${t.stock===0?"s-out":t.stock<=3?"s-low":"s-ok"}`}>
                                    {t.stock===0?"Εξαντλήθηκε":t.stock<=3?`⚠ ${t.stock} τεμ.`:`${t.stock} τεμ.`}
                                  </span>
                                  <div className="tire-row-actions">
                                    <button className="action-btn" onClick={()=>setEditTire({...t})}>✏ Επεξεργασία</button>
                                    <button className="action-btn del-btn" onClick={()=>setDelTire(t)}>🗑</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
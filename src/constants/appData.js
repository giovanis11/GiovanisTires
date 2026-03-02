export const INITIAL_TIRES = [
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

export const BRAND_ICONS = { Michelin:"🇫🇷", Continental:"🇩🇪", Bridgestone:"🇯🇵", Pirelli:"🇮🇹", Goodyear:"🇺🇸", Nokian:"🇫🇮", Hankook:"🇰🇷", Dunlop:"🇬🇧", Falken:"🇯🇵", Toyo:"🇯🇵" };
export const WIDTHS  = ["175","185","195","205","215","225","235","245","255","265","275","285","295","305"];
export const ASPECTS = ["35","40","45","50","55","60","65","70","75","80"];
export const RIMS    = ["14","15","16","17","18","19","20","21","22"];
export const TYPES   = ["Καλοκαιρινό","Χειμερινό","All Season"];
export const BRANDS_LIST = ["Michelin","Continental","Bridgestone","Pirelli","Goodyear","Nokian","Hankook","Dunlop","Falken","Toyo","Kumho","Yokohama","Vredestein","BFGoodrich","Cooper","Άλλη μάρκα"];
export const FUELS   = ["A","B","C","D","E"];
export const WETS    = ["A","B","C","D","E"];
export const SPEEDS  = ["R","H","T","V","W","Y"];
export const FUEL_COLORS = { A:"#166534", B:"#15803d", C:"#92400e", D:"#991b1b", E:"#7f1d1d" };
export const WET_COLORS  = { A:"#1e40af", B:"#1d4ed8", C:"#7e22ce", D:"#9d174d", E:"#7f1d1d" };
export const BLANK = { brand:"", name:"", width:"", aspect:"", rim:"", type:"", price:"", stock:"", fuel:"A", wet:"A", noise:"70", load:"91", speed:"V", description:"" };
export const DASHBOARD_PASSWORD = "2003";
export const TIRES_STORAGE_KEY = "giovanis-tires.inventory.v1";
export const PRICE_FILTER_MAX = 2000;

export const getNextTireId = (list) =>
  list.reduce((maxId, tire) => Math.max(maxId, Number(tire?.id) || 0), 0) + 1;

export const loadTiresFromStorage = () => {
  if (typeof window === "undefined") return INITIAL_TIRES;
  try {
    const raw = window.localStorage.getItem(TIRES_STORAGE_KEY);
    if (!raw) return INITIAL_TIRES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_TIRES;
  } catch {
    return INITIAL_TIRES;
  }
};

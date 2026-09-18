/**
 * One-time catalog builder for V&V Capital LLC.
 * Reads the shared product image library (read-only), picks semantically
 * matching assets, copies them into public/products, and writes data/products.ts.
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pick, search, absolutePath, products as libraryProducts } from "/Users/solomon/Documents/Ecommerce-Product-Library/scripts/select-image.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_PRODUCTS = join(ROOT, "public", "products");
const OUT_FILE = join(ROOT, "data", "products.ts");

const CONCEPTS = [
  // —— Kitchen & Dining ——————————————————————————————
  {
    slug: "arden-copper-kettle",
    name: "Arden Copper Kettle",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "kettle",
    forceId: "asset_139",
    reused: true,
    price: 128,
    rating: 4.8,
    reviews: 214,
    stock: 22,
    featured: true,
    bestseller: true,
    sku: "VNV-KT-001",
    description:
      "A hammered copper stovetop kettle with a gooseneck pour and a high swing handle. Built for the range, not a plug — the kind of object that earns its place on the hob.",
    features: ["Hammered copper body", "Gooseneck pour spout", "Swing handle", "Stovetop use"],
    specifications: { Capacity: "1.7L", Material: "Copper", Use: "Stovetop", Finish: "Hammered copper" },
  },
  {
    slug: "millhouse-hand-mill",
    name: "Millhouse Hand Coffee Mill",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "coffee grinder",
    forceId: "asset_127",
    reused: true,
    price: 86,
    rating: 4.7,
    reviews: 168,
    stock: 28,
    featured: true,
    sku: "VNV-KT-002",
    description:
      "A wooden box mill with a steel hopper and a hand crank. No motor, no settings menu — just a consistent grind and a drawer that catches the grounds.",
    features: ["Cast-steel grinding mechanism", "Wooden catch drawer", "Adjustable grind", "Hand-crank operation"],
    specifications: { Type: "Manual mill", Body: "Wood + steel", Drawer: "Yes", Finish: "Oiled wood" },
  },
  {
    slug: "linden-pour-over-set",
    name: "Linden Pour-Over Set",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "coffee dripper",
    forceId: "asset_086",
    price: 64,
    rating: 4.6,
    reviews: 97,
    stock: 34,
    newArrival: true,
    sku: "VNV-KT-003",
    description:
      "A ceramic dripper, glass carafe, and the rhythm of a slower morning. Sized for one or two cups, with a heat-retaining dripper that sits cleanly on the server.",
    features: ["Ceramic dripper", "Glass carafe", "Even extraction ridges", "Easy to rinse clean"],
    specifications: { Includes: "Dripper + carafe", Material: "Ceramic + glass", Size: "1–2 cups", Care: "Hand wash" },
  },
  {
    slug: "hearth-cast-iron-skillet",
    name: "Hearth Cast Iron Skillet",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "skillet",
    price: 68,
    rating: 4.9,
    reviews: 312,
    stock: 48,
    bestseller: true,
    sku: "VNV-KT-004",
    description:
      "A pre-seasoned ten-inch skillet for weeknight cooking and weekend eggs. Built to last, with a helper handle and a surface that improves with use.",
    features: ["Pre-seasoned cooking surface", "Even heat retention", "Helper handle", "Oven-safe"],
    specifications: { Size: "10 inch", Material: "Cast iron", Oven: "Up to 500°F", Origin: "USA foundry" },
  },
  {
    slug: "walnut-serving-board",
    name: "Walnut Serving Board",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "cutting board",
    forceId: "asset_143",
    price: 84,
    rating: 4.8,
    reviews: 141,
    stock: 29,
    featured: true,
    sku: "VNV-KT-005",
    description:
      "An end-grain walnut board that is kinder to knives and handsome enough to leave on the island. Juice groove, rubber feet, and a mineral-oil finish.",
    features: ["End-grain walnut construction", "Juice groove", "Non-slip feet", "Food-safe oil finish"],
    specifications: { Material: "Walnut", Size: "18 × 12 in", Thickness: "1.5 in", Care: "Hand wash, oil monthly" },
  },
  {
    slug: "sutton-celadon-plates",
    name: "Sutton Celadon Plates, Set of 4",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "dinner plate",
    forceId: "asset_137",
    price: 86,
    rating: 4.7,
    reviews: 188,
    stock: 32,
    featured: true,
    sku: "VNV-KT-006",
    description:
      "Fluted celadon plates with a scalloped rim and a quiet floral well. The glaze is the muted forest green that makes a table feel finished without pattern overload.",
    features: ["Set of four", "Fluted celadon glaze", "Scalloped rim", "Dishwasher safe"],
    specifications: { Pieces: "4", Diameter: "10 in", Material: "Porcelain", Color: "Celadon" },
  },
  {
    slug: "elm-white-mugs",
    name: "Elm White Mugs, Set of 2",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "mug",
    forceId: "asset_125",
    price: 32,
    rating: 4.8,
    reviews: 256,
    stock: 80,
    bestseller: true,
    sku: "VNV-KT-007",
    description:
      "A pair of white ceramic mugs with a slightly tapered body and a handle that sits well in the hand. No decoration. No apology.",
    features: ["Set of two", "12 oz capacity", "Tapered ceramic body", "Dishwasher safe"],
    specifications: { Pieces: "2", Capacity: "12 oz", Material: "Ceramic", Color: "White" },
  },
  {
    slug: "claremont-wine-glasses",
    name: "Claremont Wine Glasses, Set of 4",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "wine glass",
    price: 58,
    rating: 4.6,
    reviews: 124,
    stock: 44,
    sku: "VNV-KT-008",
    description:
      "Thin-stemmed glasses with a quietly classic bowl. Light in the hand, durable enough for regular use, and sized for both red and white.",
    features: ["Set of four", "Lead-free crystal", "Dishwasher safe", "Universal bowl shape"],
    specifications: { Pieces: "4", Capacity: "16 oz", Material: "Lead-free crystal", Height: "8.75 in" },
  },
  {
    slug: "grove-serving-bowl",
    name: "Grove Serving Bowl",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "serving bowl",
    price: 48,
    rating: 4.7,
    reviews: 93,
    stock: 38,
    sku: "VNV-KT-009",
    description:
      "A wide ceramic serving bowl for salads, fruit, or a family-style meal. The glaze is matte, the silhouette is simple, and it looks as well on a sideboard as on the table.",
    features: ["Generous 3-quart capacity", "Chip-resistant ceramic", "Matte glaze", "Oven-safe to 400°F"],
    specifications: { Capacity: "3 qt", Material: "Ceramic", Diameter: "11 in", Color: "Stone" },
  },
  {
    slug: "ashford-serving-tray",
    name: "Ashford Serving Tray",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "serving tray",
    price: 54,
    rating: 4.5,
    reviews: 77,
    stock: 33,
    sku: "VNV-KT-010",
    description:
      "A wood serving tray with inset handles, made for coffee in the living room or a composed table setting. The grain does the decorating.",
    features: ["Solid wood construction", "Inset handles", "Raised rim", "Food-safe finish"],
    specifications: { Material: "Oak", Size: "18 × 12 in", Finish: "Natural oil", Care: "Wipe clean" },
  },
  {
    slug: "meridian-flatware-set",
    name: "Meridian Flatware Set",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "flatware",
    price: 96,
    rating: 4.7,
    reviews: 109,
    stock: 40,
    featured: true,
    sku: "VNV-KT-011",
    description:
      "A twenty-piece stainless set with a balanced weight and a brushed finish that hides the marks of daily use. Service for four, without ornament.",
    features: ["20-piece service for four", "18/10 stainless steel", "Brushed finish", "Dishwasher safe"],
    specifications: { Pieces: "20", Material: "18/10 stainless", Finish: "Brushed", Service: "4 place settings" },
  },
  {
    slug: "brookline-teapot",
    name: "Brookline Teapot",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "teapot",
    price: 64,
    rating: 4.6,
    reviews: 81,
    stock: 27,
    newArrival: true,
    sku: "VNV-KT-012",
    description:
      "A ceramic teapot with a reliable strainer and a lid that stays put. Sized for two or three cups — enough for a conversation, not a crowd.",
    features: ["Built-in infuser", "Drip-free pour", "Stay-cool handle", "24 oz capacity"],
    specifications: { Capacity: "24 oz", Material: "Ceramic", Includes: "Infuser", Color: "Cream" },
  },
  {
    slug: "essex-espresso-cups",
    name: "Essex Espresso Cups, Set of 2",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "espresso cup",
    price: 28,
    rating: 4.5,
    reviews: 64,
    stock: 52,
    sku: "VNV-KT-013",
    description:
      "Two small cups with saucers, glazed in a quiet white. Thick enough to keep a shot warm, light enough for everyday espresso.",
    features: ["Cups and saucers included", "3 oz capacity", "Dense ceramic", "Dishwasher safe"],
    specifications: { Pieces: "2 cups + 2 saucers", Capacity: "3 oz", Material: "Ceramic", Color: "White" },
  },
  {
    slug: "field-kitchen-scale",
    name: "Field Kitchen Scale",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "kitchen scale",
    price: 42,
    rating: 4.6,
    reviews: 118,
    stock: 47,
    sku: "VNV-KT-014",
    description:
      "A compact digital scale with a clean face and gram-to-ounce conversion. Useful for baking, coffee, and the small precision that makes cooking better.",
    features: ["0.1 g precision", "Tare function", "Switchable units", "Rechargeable battery"],
    specifications: { Capacity: "11 lb / 5 kg", Precision: "0.1 g", Units: "g / oz / lb", Color: "Graphite" },
  },
  {
    slug: "pane-spice-vials",
    name: "Pane Spice Vials, Set of 4",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "spice jar",
    forceId: "asset_136",
    price: 28,
    rating: 4.7,
    reviews: 152,
    stock: 58,
    sku: "VNV-KT-015",
    description:
      "Four cork-topped glass vials for the spices you actually reach for. Small, clear, and meant to live near the stove rather than in a forgotten rack.",
    features: ["Set of four", "Cork stoppers", "Clear glass", "Kitchen-counter scale"],
    specifications: { Pieces: "4", Material: "Glass + cork", Size: "2 oz each", Use: "Dry spices" },
  },
  {
    slug: "hearthside-shaker-set",
    name: "Hearthside Salt & Pepper Set",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "shaker set",
    price: 32,
    rating: 4.5,
    reviews: 73,
    stock: 66,
    sku: "VNV-KT-016",
    description:
      "A pair of ceramic shakers with a modest profile. Meant to stay on the table, not be put away between meals.",
    features: ["Ceramic pair", "Adjustable grind / pour", "Weighted bases", "Refillable"],
    specifications: { Pieces: "2", Material: "Ceramic", Height: "4.5 in", Color: "Ivory" },
  },

  // —— Home ———————————————————————————————————————————
  {
    slug: "rowen-knit-throw",
    name: "Rowen Knit Throw",
    category: "Home",
    categorySlug: "home",
    query: "throw blanket",
    forceId: "asset_109",
    price: 88,
    rating: 4.8,
    reviews: 201,
    stock: 45,
    featured: true,
    bestseller: true,
    sku: "VNV-HM-001",
    description:
      "A heavy knit throw in unbleached oat. Ribbed, substantial, and the sort of thing that lives on the arm of a sofa rather than in a closet.",
    features: ["Heavy cotton knit", "Ribbed texture", "Generous drape", "Machine washable"],
    specifications: { Material: "Cotton knit", Size: "50 × 70 in", Color: "Oat", Care: "Machine wash cold" },
  },
  {
    slug: "marlowe-wool-rug",
    skip: true,
    name: "Marlowe Wool Area Rug",
    category: "Home",
    categorySlug: "home",
    query: "area rug",
    price: 248,
    salePrice: 198,
    rating: 4.7,
    reviews: 86,
    stock: 18,
    badge: "Sale",
    featured: true,
    sku: "VNV-HM-002",
    description:
      "A low-pile wool rug in a warm, heathered neutral. Soft underfoot, durable enough for a lived-in room, and quiet enough to let the furniture do the talking.",
    features: ["Hand-tufted wool", "Low pile for easy care", "Non-slip backing recommended", "Sheds less over time"],
    specifications: { Material: "Wool", Size: "5 × 8 ft", Pile: "Low", Color: "Warm stone" },
  },
  {
    slug: "ellis-cotton-cushion",
    name: "Ellis Cotton Cushion",
    category: "Home",
    categorySlug: "home",
    query: "cushion",
    price: 42,
    rating: 4.6,
    reviews: 134,
    stock: 70,
    sku: "VNV-HM-003",
    description:
      "A square cushion in heavy cotton with a hidden zipper and a down-alternative insert. The kind of extra seat that actually gets used.",
    features: ["Removable cover", "Down-alternative fill", "Knife-edge finish", "Hidden zipper"],
    specifications: { Size: "20 × 20 in", Material: "Cotton", Fill: "Polyester down-alt", Color: "Taupe" },
  },
  {
    slug: "sable-ceramic-vase",
    name: "Sable Celadon Vase",
    category: "Home",
    categorySlug: "home",
    query: "ceramic vase",
    forceId: "asset_100",
    price: 64,
    rating: 4.8,
    reviews: 119,
    stock: 24,
    featured: true,
    sku: "VNV-HM-004",
    description:
      "A small celadon jar-vase with a pale glaze and a slightly irregular foot. Low, round, and enough for a handful of stems or nothing at all.",
    features: ["Celadon glaze", "Wheel-thrown ceramic", "Watertight", "Works with cuttings or empty"],
    specifications: { Height: "6 in", Material: "Ceramic", Color: "Celadon", Care: "Hand wash" },
  },
  {
    slug: "pippin-bud-vases",
    name: "Pippin Glass Bud Vases, Set of 4",
    category: "Home",
    categorySlug: "home",
    query: "bud vase",
    forceId: "asset_107",
    price: 42,
    rating: 4.7,
    reviews: 88,
    stock: 40,
    sku: "VNV-HM-005",
    description:
      "Four clear glass vessels — two with swing-top closures — for a single stem or a cutting from the garden. Grouped on a table, they do more than one large arrangement.",
    features: ["Set of four mixed shapes", "Clear glass", "Swing-top pair included", "Gift-ready scale"],
    specifications: { Pieces: "4", Material: "Glass", Height: "5–8 in", Use: "1–3 stems each" },
  },
  {
    slug: "northam-table-lamp",
    skip: true,
    name: "Northam Table Lamp",
    category: "Home",
    categorySlug: "home",
    query: "table lamp",
    price: 128,
    rating: 4.7,
    reviews: 97,
    stock: 26,
    featured: true,
    sku: "VNV-HM-006",
    description:
      "A ceramic-base table lamp with a linen shade and a warm, even glow. Sized for a bedside, a console, or the corner of a desk.",
    features: ["Linen drum shade", "Three-way socket", "Ceramic base", "8-foot cloth cord"],
    specifications: { Height: "22 in", Shade: "Linen", Base: "Ceramic", Bulb: "E26, not included" },
  },
  {
    slug: "halden-floor-lamp",
    name: "Halden Tripod Floor Lamp",
    category: "Home",
    categorySlug: "home",
    query: "floor lamp",
    forceId: "asset_094",
    price: 248,
    rating: 4.6,
    reviews: 64,
    stock: 14,
    featured: true,
    sku: "VNV-HM-007",
    description:
      "A tripod floor lamp in russet-painted steel, with a conical shade that tips toward the chair. Mid-century in silhouette, without becoming a replica.",
    features: ["Tripod steel base", "Adjustable conical shade", "Painted russet finish", "Inline switch"],
    specifications: { Height: "58 in", Shade: "Steel cone", Finish: "Russet", Bulb: "E26, not included" },
  },
  {
    slug: "glen-wall-mirror",
    name: "Glen Wall Mirror",
    category: "Home",
    categorySlug: "home",
    query: "wall mirror",
    price: 164,
    rating: 4.8,
    reviews: 72,
    stock: 22,
    sku: "VNV-HM-008",
    description:
      "An oval wall mirror with a slim wood frame. Useful in an entry, a dressing area, or anywhere a room needs a little more light.",
    features: ["Beveled glass", "Solid wood frame", "French cleat hanging", "Vertical or horizontal"],
    specifications: { Size: "24 × 36 in", Frame: "Oak", Glass: "Beveled", Orientation: "Either" },
  },
  {
    slug: "folio-picture-frame",
    skip: true,
    name: "Folio Picture Frame",
    category: "Home",
    categorySlug: "home",
    query: "picture frame",
    price: 34,
    rating: 4.5,
    reviews: 101,
    stock: 84,
    sku: "VNV-HM-009",
    description:
      "A wood picture frame with a slender profile and true-clear glass. Made for a photograph you actually want to look at.",
    features: ["True-clear glass", "Easy-open back", "Tabletop easel and wall mount", "Acid-free mat"],
    specifications: { Size: "8 × 10 in", Frame: "Walnut-stained wood", Mat: "Ivory", Display: "Table or wall" },
  },
  {
    slug: "weston-wall-clock",
    name: "Weston Wall Clock",
    category: "Home",
    categorySlug: "home",
    query: "wall clock",
    price: 76,
    rating: 4.6,
    reviews: 59,
    stock: 31,
    sku: "VNV-HM-010",
    description:
      "A quiet analog clock with a wood case and a simple face. No branding, no second-hand tick you can hear from the next room.",
    features: ["Silent quartz movement", "Wood case", "Easy-read numerals", "Requires 1 AA battery"],
    specifications: { Diameter: "12 in", Case: "Walnut", Movement: "Silent quartz", Battery: "AA" },
  },
  {
    slug: "atelier-study-print",
    name: "Atelier Study Print",
    category: "Home",
    categorySlug: "home",
    query: "art print",
    forceId: "asset_118",
    price: 48,
    rating: 4.7,
    reviews: 83,
    stock: 40,
    newArrival: true,
    sku: "VNV-HM-011",
    description:
      "An archival reproduction of an early-century studio study — a figure at a press, framed in a geometric border. Quiet enough for a hallway, present enough for a desk.",
    features: ["Archival pigment print", "Heavyweight cotton paper", "Unframed", "Made to order"],
    specifications: { Size: "16 × 16 in", Paper: "Cotton rag", Finish: "Matte", Frame: "Sold separately" },
  },
  {
    slug: "terra-plant-pot",
    name: "Terra Stoneware Planter",
    category: "Home",
    categorySlug: "home",
    query: "plant pot",
    price: 38,
    rating: 4.6,
    reviews: 147,
    stock: 55,
    sku: "VNV-HM-012",
    description:
      "A stoneware planter with a drainage hole and a matching saucer. The glaze is matte, the proportions are generous, and it looks as well empty as planted.",
    features: ["Drainage hole and saucer", "Matte stoneware", "Indoor use", "Weighted base"],
    specifications: { Diameter: "8 in", Material: "Stoneware", Includes: "Saucer", Color: "Clay" },
  },
  {
    slug: "wicker-storage-basket",
    name: "Seagrass Floor Basket",
    category: "Home",
    categorySlug: "home",
    query: "laundry basket",
    forceId: "asset_110",
    price: 58,
    rating: 4.7,
    reviews: 166,
    stock: 36,
    sku: "VNV-HM-013",
    description:
      "A handled seagrass basket for throws, kindling, or the laundry that has not yet become a project. Tight chevron weave, sturdy base, and a presence that belongs beside a chair.",
    features: ["Chevron seagrass weave", "Integrated handles", "Reinforced base", "Folds when empty"],
    specifications: { Size: "16 × 16 × 14 in", Material: "Seagrass", Handles: "Woven", Color: "Natural" },
  },
  {
    slug: "archive-storage-box",
    name: "Archive Lidded Storage Box",
    category: "Home",
    categorySlug: "home",
    query: "storage box",
    price: 36,
    rating: 4.5,
    reviews: 92,
    stock: 63,
    sku: "VNV-HM-014",
    description:
      "A lidded box for papers, seasonal clothes, or the odds that belong in a closet rather than on a surface. Clean lines, durable board, fabric wrap.",
    features: ["Hinged lid", "Fabric-wrapped board", "Interior label card", "Stackable"],
    specifications: { Size: "14 × 10 × 6 in", Material: "Board + linen", Color: "Stone", Use: "Closet / shelf" },
  },
  {
    slug: "linley-wall-shelf",
    name: "Linley Wall Shelf",
    category: "Home",
    categorySlug: "home",
    query: "wall shelf",
    price: 58,
    rating: 4.6,
    reviews: 71,
    stock: 37,
    sku: "VNV-HM-015",
    description:
      "A solid-wood floating shelf with hidden hardware. For a few books, a lamp, or the objects that earn a place at eye level.",
    features: ["Hidden bracket hardware", "Solid wood", "30 lb capacity", "Includes mounting kit"],
    specifications: { Size: "36 × 8 in", Material: "Oak", Capacity: "30 lb", Finish: "Natural oil" },
  },
  {
    slug: "cinder-decorative-bowl",
    name: "Cinder Decorative Bowl",
    category: "Home",
    categorySlug: "home",
    query: "decorative bowl",
    price: 44,
    rating: 4.5,
    reviews: 58,
    stock: 41,
    sku: "VNV-HM-016",
    description:
      "A low ceramic bowl for keys, fruit, or nothing at all. The interior glaze is slightly darker than the rim — enough variation to feel made by hand.",
    features: ["Hand-glazed ceramic", "Low centerpiece profile", "Food safe", "Weighted base"],
    specifications: { Diameter: "11 in", Material: "Ceramic", Color: "Charcoal", Care: "Hand wash" },
  },
  {
    slug: "solstice-pillar-candle",
    skip: true,
    name: "Solstice Pillar Candle",
    category: "Home",
    categorySlug: "home",
    query: "candle",
    price: 28,
    rating: 4.8,
    reviews: 203,
    stock: 88,
    bestseller: true,
    sku: "VNV-HM-017",
    description:
      "A soy-blend pillar with a slow, even burn and a scent that stays close: cedar, fig leaf, and a little smoke. Meant for a table, not a department-store display.",
    features: ["Soy-blend wax", "Cotton wick", "45-hour burn", "Scented with cedar and fig"],
    specifications: { Size: "3 × 6 in", Wax: "Soy blend", Burn: "45 hours", Scent: "Cedar / fig" },
  },
  {
    slug: "brass-candle-holder",
    skip: true,
    name: "Brass Taper Holder",
    category: "Home",
    categorySlug: "home",
    query: "candle holder",
    price: 22,
    rating: 4.6,
    reviews: 74,
    stock: 79,
    sku: "VNV-HM-018",
    description:
      "A single taper holder in unlacquered brass that will darken with use. Small, useful, and better in a pair.",
    features: ["Unlacquered brass", "Fits standard tapers", "Weighted base", "Will patina over time"],
    specifications: { Height: "4 in", Material: "Brass", Fits: "Standard taper", Finish: "Unlacquered" },
  },
  {
    slug: "haven-bath-towels",
    name: "Haven Hotel Towel Set",
    category: "Home",
    categorySlug: "home",
    query: "bath towel",
    forceId: "asset_078",
    reused: true,
    price: 86,
    salePrice: 72,
    rating: 4.8,
    reviews: 274,
    stock: 52,
    badge: "Sale",
    featured: true,
    bestseller: true,
    sku: "VNV-HM-019",
    description:
      "A set of dense white cotton towels with a grey-stripe dobby border. Hotel weight without the hotel branding — the kind of white that belongs in a proper bath.",
    features: ["600 GSM long-staple cotton", "Grey-stripe dobby border", "Quick-drying pile", "Machine washable"],
    specifications: { Material: "100% cotton", Weight: "600 GSM", Color: "White / grey stripe", Pieces: "Bath + hand" },
  },
  {
    slug: "entry-doormat",
    name: "Entry Coir Doormat",
    category: "Home",
    categorySlug: "home",
    query: "doormat",
    price: 38,
    rating: 4.5,
    reviews: 119,
    stock: 60,
    sku: "VNV-HM-020",
    description:
      "A heavy coir mat with a low profile and a no-nonsense scrape. For a front door that sees actual weather.",
    features: ["Natural coir fibers", "PVC backing", "Low-profile edge", "Outdoor-safe"],
    specifications: { Size: "18 × 30 in", Material: "Coir", Backing: "PVC", Use: "Covered entry" },
  },
  {
    slug: "oak-wall-hooks",
    name: "Oak Wall Hooks, Set of 3",
    category: "Home",
    categorySlug: "home",
    query: "wall hooks",
    price: 32,
    rating: 4.6,
    reviews: 88,
    stock: 71,
    sku: "VNV-HM-021",
    description:
      "Three solid-oak hooks for coats, bags, or a kitchen towel. Hardware included, spacing left to you.",
    features: ["Solid oak", "Set of three", "Hidden screw mount", "Holds 10 lb each"],
    specifications: { Pieces: "3", Material: "Oak", Projection: "3.5 in", Capacity: "10 lb each" },
  },

  // —— Workspace ——————————————————————————————————————
  {
    slug: "ledger-linen-notebook",
    name: "Ledger Linen Notebook",
    category: "Workspace",
    categorySlug: "workspace",
    query: "notebook",
    price: 28,
    rating: 4.7,
    reviews: 156,
    stock: 94,
    featured: true,
    sku: "VNV-WS-001",
    description:
      "A cloth-bound notebook with cream paper that takes ink without fuss. Numbered pages, a ribbon marker, and a size that fits a bag without becoming a project.",
    features: ["Cloth-bound cover", "Cream fountain-pen friendly paper", "Numbered pages", "Ribbon marker"],
    specifications: { Size: "A5", Pages: "192", Paper: "90 gsm cream", Ruling: "Lined" },
  },
  {
    slug: "yearling-desk-planner",
    name: "Yearling Desk Planner",
    category: "Workspace",
    categorySlug: "workspace",
    query: "planner",
    price: 36,
    rating: 4.6,
    reviews: 102,
    stock: 57,
    newArrival: true,
    sku: "VNV-WS-002",
    description:
      "An undated weekly planner with enough structure to be useful and enough space to ignore. Lay-flat binding, a muted cover, no slogans.",
    features: ["Undated weekly spreads", "Lay-flat binding", "Monthly overview pages", "Pocket at the back"],
    specifications: { Size: "A5", Pages: "144", Paper: "100 gsm", Cover: "Linen wrap" },
  },
  {
    slug: "nile-fountain-pen",
    name: "Nile Fountain Pen",
    category: "Workspace",
    categorySlug: "workspace",
    query: "pen",
    price: 64,
    rating: 4.8,
    reviews: 91,
    stock: 43,
    sku: "VNV-WS-003",
    description:
      "A brass fountain pen with a fine steel nib and a converter. It will darken in the hand. That is the point.",
    features: ["Fine steel nib", "Cartridge or converter", "Unlacquered brass", "Gift box included"],
    specifications: { Nib: "Fine steel", Body: "Brass", Fill: "Cartridge / converter", Length: "5.3 in" },
  },
  {
    slug: "well-pen-cup",
    skip: true,
    name: "Well Ceramic Pen Cup",
    category: "Workspace",
    categorySlug: "workspace",
    query: "pen cup",
    price: 22,
    rating: 4.5,
    reviews: 67,
    stock: 78,
    sku: "VNV-WS-004",
    description:
      "A small ceramic cup for pens, scissors, and the few tools that deserve to stay on the desk.",
    features: ["Glazed ceramic", "Weighted base", "4-inch diameter", "Wipe clean"],
    specifications: { Diameter: "4 in", Height: "4.25 in", Material: "Ceramic", Color: "Ivory" },
  },
  {
    slug: "rise-laptop-stand",
    name: "Rise Aluminum Laptop Stand",
    category: "Workspace",
    categorySlug: "workspace",
    query: "laptop stand",
    price: 68,
    rating: 4.7,
    reviews: 143,
    stock: 39,
    sku: "VNV-WS-005",
    description:
      "A low-profile aluminum stand that lifts a laptop to a more reasonable height. Ventilated, stable, and quiet on the desk.",
    features: ["Angled ergonomic lift", "Aluminum construction", "Ventilated deck", "Folds flat"],
    specifications: { Material: "Aluminum", Fits: "Up to 16 in", Weight: "1.6 lb", Finish: "Anodized silver" },
  },
  {
    slug: "field-desk-lamp",
    name: "Field Gooseneck Desk Lamp",
    category: "Workspace",
    categorySlug: "workspace",
    query: "desk light",
    forceId: "asset_045",
    reused: true,
    price: 58,
    rating: 4.7,
    reviews: 178,
    stock: 41,
    featured: true,
    sku: "VNV-WS-006",
    description:
      "A white gooseneck lamp with a focused cone shade. It clips the light to the work, not the whole room, and sits cleanly beside a laptop.",
    features: ["Flexible gooseneck", "Focused cone shade", "Weighted round base", "LED compatible"],
    specifications: { Height: "18 in", Shade: "Metal cone", Finish: "White", Bulb: "E12, not included" },
  },
  {
    slug: "harbor-alarm-clock",
    name: "Harbor Analog Alarm Clock",
    category: "Workspace",
    categorySlug: "workspace",
    query: "alarm clock",
    price: 48,
    rating: 4.5,
    reviews: 81,
    stock: 36,
    sku: "VNV-WS-007",
    description:
      "A small analog alarm with a wood case and a quiet tick. No screen, no glow, just a timepiece that belongs on a nightstand or a desk.",
    features: ["Silent sweep second hand", "Gentle alarm", "Wood case", "Snooze"],
    specifications: { Diameter: "4 in", Case: "Wood", Movement: "Quartz", Battery: "AA" },
  },

  // —— Travel ——————————————————————————————————————————
  {
    slug: "weekender-canvas-bag",
    name: "Weekender Canvas Holdall",
    category: "Travel",
    categorySlug: "travel",
    query: "weekender bag",
    price: 148,
    rating: 4.8,
    reviews: 167,
    stock: 28,
    featured: true,
    bestseller: true,
    sku: "VNV-TR-001",
    description:
      "A canvas holdall with leather trim, a generous opening, and a shoe compartment that actually separates. For an overnight or a short trip that should not require a suitcase.",
    features: ["Water-resistant canvas", "Leather handles and strap", "Shoe compartment", "Padded laptop sleeve"],
    specifications: { Capacity: "40 L", Material: "Canvas + leather", Fits: "Under seat / overhead", Color: "Olive" },
  },
  {
    slug: "carry-on-spinner",
    skip: true,
    skip: true,
    name: "Carry-On Spinner Case",
    category: "Travel",
    categorySlug: "travel",
    query: "suitcase",
    price: 228,
    salePrice: 198,
    rating: 4.7,
    reviews: 132,
    stock: 21,
    badge: "Sale",
    sku: "VNV-TR-002",
    description:
      "A hard-shell carry-on with four wheels that actually spin and a compression panel that makes packing less of a negotiation. Designed to the standard overhead size.",
    features: ["360° spinner wheels", "TSA-approved lock", "Compression panel", "Interior laundry pocket"],
    specifications: { Size: "22 × 14 × 9 in", Shell: "Polycarbonate", Weight: "6.8 lb", Color: "Graphite" },
  },
  {
    slug: "dayline-backpack",
    name: "Field Canvas Daypack",
    category: "Travel",
    categorySlug: "travel",
    query: "daypack",
    forceId: "asset_189",
    price: 148,
    rating: 4.8,
    reviews: 94,
    stock: 24,
    featured: true,
    sku: "VNV-TR-003",
    description:
      "An olive canvas daypack with leather straps and a flap that buckles shut. Built for the commute or a day that leaves the pavement, without looking like expedition gear.",
    features: ["Waxed canvas body", "Leather straps and buckles", "Flap closure", "Front utility pockets"],
    specifications: { Capacity: "18 L", Material: "Canvas + leather", Color: "Olive", Laptop: "Fits 13 in sleeve" },
  },
  {
    slug: "cross-town-bag",
    name: "Cross-Town Crossbody",
    category: "Travel",
    categorySlug: "travel",
    query: "crossbody bag",
    price: 98,
    rating: 4.6,
    reviews: 121,
    stock: 46,
    sku: "VNV-TR-004",
    description:
      "A compact crossbody for days that do not require a full bag. Adjustable strap, a zip that sits against the body, and room for a phone, keys, and a slim wallet.",
    features: ["Adjustable strap", "RFID card pocket", "Secure zip closure", "Water-resistant lining"],
    specifications: { Size: "9 × 6 × 2.5 in", Material: "Leather", Strap: "Adjustable", Color: "Taupe" },
  },
  {
    slug: "courier-messenger",
    name: "Courier Messenger Bag",
    category: "Travel",
    categorySlug: "travel",
    query: "messenger bag",
    price: 132,
    rating: 4.7,
    reviews: 88,
    stock: 31,
    sku: "VNV-TR-005",
    description:
      "A structured messenger with a flap that closes cleanly and a strap that does not slip. Built for a laptop, a notebook, and the rest of a working day.",
    features: ["Padded 15 in sleeve", "Quick-access front pocket", "Stabilizing strap pad", "Weather-resistant canvas"],
    specifications: { Material: "Canvas + leather", Laptop: "15 in", Strap: "Adjustable", Color: "Charcoal" },
  },
  {
    slug: "voyage-luggage-tag",
    name: "Voyage Leather Luggage Tag",
    category: "Travel",
    categorySlug: "travel",
    query: "luggage tag",
    price: 24,
    rating: 4.5,
    reviews: 76,
    stock: 102,
    sku: "VNV-TR-006",
    description:
      "A leather luggage tag with a privacy flap and a sturdy strap. Identification without a plastic pouch.",
    features: ["Privacy flap", "Hand-cut leather", "ID card included", "Fits any handle"],
    specifications: { Material: "Leather", Size: "4.3 × 2.7 in", Color: "Cognac", Includes: "ID card" },
  },
  {
    slug: "commute-travel-tumbler",
    name: "Commute Travel Tumbler",
    category: "Travel",
    categorySlug: "travel",
    query: "travel tumbler",
    price: 34,
    rating: 4.7,
    reviews: 211,
    stock: 86,
    bestseller: true,
    sku: "VNV-TR-007",
    description:
      "A double-wall tumbler that keeps coffee hot through a commute and does not leak in a bag. The lid is simple. The finish is matte.",
    features: ["Leak-resistant lid", "Double-wall insulation", "Fits most cup holders", "16-hour heat retention"],
    specifications: { Capacity: "16 oz", Material: "Stainless steel", Insulation: "Vacuum", Color: "Graphite" },
  },
  {
    slug: "canopy-umbrella",
    name: "Canopy Compact Umbrella",
    category: "Travel",
    categorySlug: "travel",
    query: "umbrella",
    price: 42,
    rating: 4.6,
    reviews: 99,
    stock: 64,
    sku: "VNV-TR-008",
    description:
      "A compact umbrella with a wind-resistant canopy and a handle you can actually hold. Black, of course — the color that belongs in a bag.",
    features: ["Wind-resistant frame", "Auto open and close", "Compact folded length", "Water-repellent canopy"],
    specifications: { Span: "42 in", Folded: "11.5 in", Frame: "Fiberglass", Color: "Black" },
  },

  // —— Apparel —————————————————————————————————————————
  {
    slug: "merino-crew-sweater",
    name: "Heather Knit Crew",
    category: "Apparel",
    categorySlug: "apparel",
    query: "sweater",
    forceId: "asset_036",
    price: 128,
    rating: 4.8,
    reviews: 154,
    stock: 38,
    featured: true,
    sku: "VNV-AP-001",
    description:
      "A fine-gauge crew in a heathered knit — charcoal, navy, grey, or oat. Soft enough to wear against the skin, structured enough to sit under a coat.",
    features: ["Fine-gauge knit", "Crew neck", "Ribbed cuffs and hem", "Machine-washable wool cycle"],
    specifications: { Material: "Merino blend", Weight: "Fine gauge", Fit: "Regular", Color: "Heather charcoal" },
  },
  {
    slug: "overland-overshirt",
    name: "Overland Cotton Overshirt",
    category: "Apparel",
    categorySlug: "apparel",
    query: "overshirt",
    price: 118,
    rating: 4.7,
    reviews: 87,
    stock: 33,
    newArrival: true,
    sku: "VNV-AP-002",
    description:
      "A mid-weight cotton overshirt with a chest pocket and a cut that works as a light jacket. The kind of layer you reach for without thinking.",
    features: ["Washed cotton twill", "Chest pocket", "Corozo buttons", "Unlined"],
    specifications: { Material: "Cotton twill", Weight: "9 oz", Fit: "Regular", Color: "Olive" },
  },
  {
    slug: "poplin-dress-shirt",
    name: "Poplin Dress Shirt",
    category: "Apparel",
    categorySlug: "apparel",
    query: "dress shirt",
    price: 88,
    rating: 4.6,
    reviews: 112,
    stock: 47,
    sku: "VNV-AP-003",
    description:
      "A cotton poplin shirt with a soft collar and enough structure for a meeting, enough ease for the rest of the day. Untucked length, clean placket.",
    features: ["Two-ply cotton poplin", "Soft point collar", "Mother-of-pearl buttons", "Untucked hem"],
    specifications: { Material: "Cotton poplin", Collar: "Soft point", Fit: "Tailored", Color: "White" },
  },
  {
    slug: "twill-everyday-trousers",
    name: "Twill Everyday Trousers",
    category: "Apparel",
    categorySlug: "apparel",
    query: "trousers",
    price: 108,
    rating: 4.7,
    reviews: 96,
    stock: 41,
    sku: "VNV-AP-004",
    description:
      "A tailored trouser in a stretch cotton twill. Crease-resistant enough for travel, considered enough for the office.",
    features: ["Stretch cotton twill", "Tapered leg", "Side-adjuster waist", "Wrinkle-resistant"],
    specifications: { Material: "Cotton / elastane", Rise: "Mid", Fit: "Tapered", Color: "Stone" },
  },
  {
    slug: "field-wool-scarf",
    name: "Field Wool Scarf",
    category: "Apparel",
    categorySlug: "apparel",
    query: "scarf",
    price: 68,
    rating: 4.8,
    reviews: 73,
    stock: 52,
    sku: "VNV-AP-005",
    description:
      "A merino-blend scarf with a tight weave and unfinished fringed ends. Warm without bulk, in a charcoal that goes with everything you already own.",
    features: ["Merino blend", "Fringed ends", "Lightweight warmth", "Generous length"],
    specifications: { Material: "Merino / silk", Size: "12 × 72 in", Color: "Charcoal", Care: "Dry clean" },
  },
  {
    slug: "bridle-leather-belt",
    name: "Bridle Leather Belt",
    category: "Apparel",
    categorySlug: "apparel",
    query: "belt",
    price: 78,
    rating: 4.7,
    reviews: 108,
    stock: 58,
    sku: "VNV-AP-006",
    description:
      "A bridle-leather belt with a solid brass buckle and an edge that will burnish with wear. Cut to a proper width for trousers, not a costume.",
    features: ["English bridle leather", "Solid brass buckle", "Single keepers", "Will patina"],
    specifications: { Width: "1.25 in", Material: "Bridle leather", Buckle: "Brass", Color: "Dark brown" },
  },
  {
    slug: "cashmere-lined-gloves",
    name: "Cashmere-Lined Leather Gloves",
    category: "Apparel",
    categorySlug: "apparel",
    query: "leather gloves",
    price: 96,
    rating: 4.6,
    reviews: 64,
    stock: 29,
    sku: "VNV-AP-007",
    description:
      "Capeskin gloves lined in cashmere. Warm, fitted, and finished so they can leave the house with a coat rather than a ski jacket.",
    features: ["Capeskin leather", "Cashmere lining", "Touch-screen compatible thumb and index", "Knit wrist"],
    specifications: { Shell: "Capeskin", Lining: "Cashmere", Color: "Black", Origin: "Cut and sewn" },
  },

  // —— Personal ————————————————————————————————————————
  {
    slug: "folio-leather-wallet",
    name: "Folio Slim Leather Wallet",
    category: "Personal",
    categorySlug: "personal",
    query: "wallet",
    forceId: "asset_010",
    reused: true,
    price: 72,
    rating: 4.7,
    reviews: 189,
    stock: 67,
    featured: true,
    bestseller: true,
    sku: "VNV-PS-001",
    description:
      "A dark-brown bifold with a coin pouch, bill compartment, and card slots that actually hold cards. Full-grain leather, contrast stitching, a profile that will not print through a pocket.",
    features: ["Full-grain leather", "Coin pouch", "Card slots + bill compartment", "Contrast stitching"],
    specifications: { Material: "Full-grain leather", Slots: "Card + coin + bill", Color: "Dark brown", Profile: "Bifold" },
  },
  {
    slug: "horizon-sunglasses",
    name: "Horizon Polarized Sunglasses",
    category: "Personal",
    categorySlug: "personal",
    query: "sunglasses",
    reused: true,
    price: 128,
    salePrice: 98,
    rating: 4.6,
    reviews: 142,
    stock: 44,
    badge: "Sale",
    sku: "VNV-PS-002",
    description:
      "A classic acetate frame with polarized lenses and UV400 protection. The shape is familiar without being a costume of a famous pair.",
    features: ["Polarized lenses", "UV400 protection", "Acetate frame", "Hard case included"],
    specifications: { Lens: "Polarized", Protection: "UV400", Frame: "Acetate", Color: "Tortoise" },
  },
  {
    slug: "meridian-field-watch",
    name: "Meridian Canvas Watch",
    category: "Personal",
    categorySlug: "personal",
    query: "watch",
    forceId: "asset_020",
    price: 168,
    rating: 4.8,
    reviews: 77,
    stock: 22,
    featured: true,
    sku: "VNV-PS-003",
    description:
      "A 40mm watch with a matte-black case, a white dial, and a black canvas strap. Quartz, no date window, no extra hands. The time, and nothing else.",
    features: ["Minimal white dial", "Matte black case", "Canvas strap", "Mineral crystal"],
    specifications: { Case: "40 mm", Crystal: "Mineral", Movement: "Quartz", Strap: "Black canvas" },
  },
  {
    slug: "link-bracelet",
    name: "Link Cuff Bracelet",
    category: "Personal",
    categorySlug: "personal",
    query: "bracelet",
    price: 58,
    rating: 4.5,
    reviews: 91,
    stock: 53,
    sku: "VNV-PS-004",
    description:
      "A simple cuff in brushed metal. Worn alone or stacked, without looking like costume jewelry.",
    features: ["Brushed finish", "Open cuff fit", "Nickel-free", "Gift box"],
    specifications: { Material: "Brass, plated", Finish: "Brushed gold", Fit: "Adjustable cuff", Width: "8 mm" },
  },
  {
    slug: "atelier-eau-de-parfum",
    skip: true,
    skip: true,
    name: "Atelier Eau de Parfum",
    category: "Personal",
    categorySlug: "personal",
    query: "perfume",
    price: 92,
    rating: 4.7,
    reviews: 118,
    stock: 35,
    newArrival: true,
    sku: "VNV-PS-005",
    description:
      "A quiet fragrance built around cedar, bergamot, and a dry amber. Present without announcing itself from across a room.",
    features: ["Eau de parfum concentration", "50 ml", "Cedar, bergamot, amber", "Refillable bottle"],
    specifications: { Size: "50 ml", Type: "Eau de parfum", Notes: "Cedar / bergamot / amber", Origin: "Compounded in USA" },
  },
  {
    slug: "grooming-travel-set",
    name: "Grooming Travel Set",
    category: "Personal",
    categorySlug: "personal",
    query: "grooming set",
    price: 64,
    rating: 4.6,
    reviews: 83,
    stock: 42,
    sku: "VNV-PS-006",
    description:
      "A compact grooming kit: comb, nail tools, and tweezers in a leather case that belongs in a weekender rather than a medicine cabinet.",
    features: ["Leather zip case", "Stainless tools", "Folding comb", "Fits a dopp kit"],
    specifications: { Pieces: "6", Case: "Leather", Tools: "Stainless steel", Color: "Cognac" },
  },
  {
    slug: "safety-razor",
    name: "Safety Razor",
    category: "Personal",
    categorySlug: "personal",
    query: "razor",
    price: 48,
    rating: 4.5,
    reviews: 69,
    stock: 51,
    sku: "VNV-PS-007",
    description:
      "A three-piece safety razor in brass with a balanced weight. Standard double-edge blades, a knurled handle, and no cartridges to remember.",
    features: ["Three-piece brass construction", "Standard DE blades", "Knurled grip", "Stand compatible"],
    specifications: { Material: "Brass", Blade: "Double edge", Weight: "3.2 oz", Finish: "Matte" },
  },
  {
    slug: "cufflink-pair",
    name: "Brushed Steel Cufflinks",
    category: "Personal",
    categorySlug: "personal",
    query: "cufflinks",
    price: 54,
    rating: 4.4,
    reviews: 41,
    stock: 38,
    sku: "VNV-PS-008",
    description:
      "A pair of brushed-steel cufflinks with a simple toggle. For the shirts that still call for them.",
    features: ["Brushed stainless", "Toggle closure", "Gift box", "Matching pair"],
    specifications: { Material: "Stainless steel", Finish: "Brushed", Closure: "Toggle", Color: "Steel" },
  },

  // —— Wellness ————————————————————————————————————————
  {
    slug: "studio-yoga-mat",
    name: "Studio Natural Yoga Mat",
    category: "Wellness",
    categorySlug: "wellness",
    query: "yoga mat",
    reused: true,
    price: 68,
    rating: 4.8,
    reviews: 241,
    stock: 55,
    featured: true,
    bestseller: true,
    sku: "VNV-WL-001",
    description:
      "A five-millimeter natural-rubber mat with a closed-cell surface that stays put. Neutral color, carrying strap, and enough cushion for a hardwood floor.",
    features: ["Natural rubber base", "Closed-cell surface", "5 mm cushion", "Carrying strap included"],
    specifications: { Thickness: "5 mm", Size: "71 × 26 in", Material: "Natural rubber", Color: "Slate" },
  },
  {
    slug: "studio-yoga-block",
    name: "Studio Cork Yoga Block",
    category: "Wellness",
    categorySlug: "wellness",
    query: "yoga block",
    price: 22,
    rating: 4.6,
    reviews: 104,
    stock: 72,
    sku: "VNV-WL-002",
    description:
      "A dense cork block with rounded edges. Stable, slightly grippy, and free of the foam look that belongs in a gym closet.",
    features: ["Natural cork", "Rounded edges", "High density", "Easy to wipe clean"],
    specifications: { Size: "9 × 6 × 4 in", Material: "Cork", Density: "High", Color: "Natural" },
  },
  {
    slug: "recovery-foam-roller",
    name: "Recovery Foam Roller",
    category: "Wellness",
    categorySlug: "wellness",
    query: "foam roller",
    reused: true,
    price: 36,
    rating: 4.7,
    reviews: 163,
    stock: 61,
    sku: "VNV-WL-003",
    description:
      "A firm roller for the kind of recovery that happens at home. High-density foam, a length that covers the back, and a surface that does not flake.",
    features: ["High-density foam", "Textured surface", "18-inch length", "Includes exercise guide"],
    specifications: { Length: "18 in", Diameter: "6 in", Material: "EVA foam", Density: "Firm" },
  },
  {
    slug: "day-insulated-bottle",
    name: "Day Insulated Bottle",
    category: "Wellness",
    categorySlug: "wellness",
    query: "insulated bottle",
    price: 38,
    rating: 4.7,
    reviews: 198,
    stock: 90,
    sku: "VNV-WL-004",
    description:
      "A vacuum bottle that keeps water cold through a workday and does not sweat on a desk. Wide mouth, simple cap, matte finish.",
    features: ["Vacuum insulation", "Wide mouth", "Leak-resistant cap", "24-hour cold"],
    specifications: { Capacity: "24 oz", Material: "Stainless steel", Insulation: "Vacuum", Color: "Olive" },
  },
  {
    slug: "bar-soap-trio",
    name: "Cedar & Clay Soap Trio",
    category: "Wellness",
    categorySlug: "wellness",
    query: "soap bar",
    price: 26,
    rating: 4.6,
    reviews: 87,
    stock: 74,
    sku: "VNV-WL-005",
    description:
      "Three olive-oil bars scented with cedar, clay, and a little citrus. Wrapped simply, meant for a shower that does not need a dozen bottles.",
    features: ["Set of three bars", "Olive oil base", "Cedar and clay scent", "Paper wrap, no plastic"],
    specifications: { Bars: "3 × 4.5 oz", Base: "Olive oil", Scent: "Cedar / clay", Wrap: "Paper" },
  },
  {
    slug: "hearth-reed-diffuser",
    name: "Hearth Reed Diffuser",
    category: "Wellness",
    categorySlug: "wellness",
    query: "reed diffuser",
    forceId: "asset_115",
    reused: true,
    price: 38,
    rating: 4.6,
    reviews: 134,
    stock: 40,
    sku: "VNV-WL-006",
    description:
      "A clear glass diffuser with rattan reeds. No motor, no light show — just a quiet cedar-and-fig scent that stays close to the room.",
    features: ["Rattan reeds", "Clear glass vessel", "Cedar and fig oil", "Lasts 8–10 weeks"],
    specifications: { Volume: "120 ml", Reeds: "8", Scent: "Cedar / fig", Vessel: "Glass" },
  },

  // —— Outdoor Living ——————————————————————————————————
  {
    slug: "hearth-fire-bowl",
    skip: true,
    skip: true,
    name: "Hearth Fire Bowl",
    category: "Outdoor Living",
    categorySlug: "outdoor",
    query: "fire pit",
    price: 198,
    rating: 4.7,
    reviews: 62,
    stock: 14,
    featured: true,
    sku: "VNV-OD-001",
    description:
      "A steel fire bowl for a terrace or a small garden. Deep enough for a proper fire, low enough to sit around without a production.",
    features: ["Carbon steel bowl", "Spark screen included", "Poker and cover", "Outdoor use"],
    specifications: { Diameter: "30 in", Material: "Carbon steel", Includes: "Screen, poker, cover", Use: "Outdoor" },
  },
  {
    slug: "meadow-picnic-blanket",
    name: "Meadow Picnic Blanket",
    category: "Outdoor Living",
    categorySlug: "outdoor",
    query: "picnic blanket",
    price: 64,
    rating: 4.6,
    reviews: 109,
    stock: 48,
    sku: "VNV-OD-002",
    description:
      "A wool-blend blanket with a waterproof backing and a leather carry strap. For a lawn, a park, or the rare day you leave the house with lunch.",
    features: ["Wool-blend face", "Waterproof backing", "Leather carry strap", "Machine-washable"],
    specifications: { Size: "55 × 70 in", Face: "Wool blend", Back: "Waterproof PE", Color: "Heather grey" },
  },
  {
    slug: "garden-tool-set",
    name: "Garden Hand Tool Set",
    category: "Outdoor Living",
    categorySlug: "outdoor",
    query: "garden tool set",
    price: 54,
    rating: 4.5,
    reviews: 71,
    stock: 39,
    sku: "VNV-OD-003",
    description:
      "Three hand tools — trowel, cultivator, transplanter — with ash handles and carbon-steel heads. For the pots and beds that actually get tended.",
    features: ["Ash wood handles", "Carbon-steel heads", "Leather hanging loops", "Three-piece set"],
    specifications: { Pieces: "3", Handles: "Ash", Heads: "Carbon steel", Includes: "Trowel, cultivator, transplanter" },
  },
  {
    slug: "can-watering-can",
    name: "Galvanized Watering Can",
    category: "Outdoor Living",
    categorySlug: "outdoor",
    query: "watering can",
    price: 46,
    rating: 4.6,
    reviews: 84,
    stock: 33,
    sku: "VNV-OD-004",
    description:
      "A galvanized can with a long spout and a rose that can be removed. Two gallons, a balanced handle, and a finish that belongs outside.",
    features: ["Galvanized steel", "Removable rose", "Balanced carry handle", "2-gallon capacity"],
    specifications: { Capacity: "2 gal", Material: "Galvanized steel", Spout: "Long, removable rose", Use: "Indoor / outdoor" },
  },
  {
    slug: "cedar-bird-feeder",
    name: "Cedar Bird Feeder",
    category: "Outdoor Living",
    categorySlug: "outdoor",
    query: "bird feeder",
    price: 42,
    rating: 4.5,
    reviews: 58,
    stock: 27,
    sku: "VNV-OD-005",
    description:
      "A cedar feeder with a copper roof and a seed tray that is easy to fill. For a garden that is meant to be looked at, not just maintained.",
    features: ["Cedar construction", "Copper-tone roof", "Easy-fill tray", "Hanging hardware included"],
    specifications: { Material: "Cedar", Capacity: "2 lb seed", Roof: "Copper-tone", Mount: "Hanging" },
  },

  // —— Everyday ————————————————————————————————————————
  {
    slug: "entry-key-tray",
    name: "Entry Key Tray",
    category: "Everyday",
    categorySlug: "everyday",
    query: "key holder",
    price: 28,
    rating: 4.5,
    reviews: 77,
    stock: 62,
    sku: "VNV-ED-001",
    description:
      "A small leather tray for keys, a watch, and whatever comes out of a pocket at the door. The catch-all that keeps a console from becoming a dump.",
    features: ["Vegetable-tanned leather", "Stitched rim", "Catches keys and coins", "Sits on any console"],
    specifications: { Size: "7 × 5 in", Material: "Leather", Color: "Cognac", Care: "Wipe clean" },
  },
  {
    slug: "ring-jewelry-dish",
    name: "Ceramic Jewelry Dish",
    category: "Everyday",
    categorySlug: "everyday",
    query: "jewelry dish",
    price: 18,
    rating: 4.6,
    reviews: 93,
    stock: 88,
    sku: "VNV-ED-002",
    description:
      "A small glazed dish for rings and earrings. The kind of object that makes a bathroom or bedside feel attended to.",
    features: ["Glazed ceramic", "Shallow well", "Gift-ready scale", "Food-safe glaze"],
    specifications: { Diameter: "4 in", Material: "Ceramic", Color: "Ivory", Use: "Jewelry / catchall" },
  },
  {
    slug: "laundry-lidded-hamper",
    skip: true,
    skip: true,
    name: "Lidded Laundry Hamper",
    category: "Everyday",
    categorySlug: "everyday",
    query: "laundry basket",
    price: 78,
    rating: 4.6,
    reviews: 81,
    stock: 26,
    sku: "VNV-ED-003",
    description:
      "A lidded hamper in a tight natural weave. It looks like furniture, which is the entire reason it exists.",
    features: ["Lidded design", "Removable cotton liner", "Side handles", "Freestanding"],
    specifications: { Size: "16 × 14 × 24 in", Material: "Seagrass", Liner: "Cotton", Color: "Natural" },
  },

  // —— Gifts ———————————————————————————————————————————
  {
    slug: "cedar-gift-box",
    name: "Cedar Gift Box",
    category: "Gifts",
    categorySlug: "gifts",
    query: "gift box",
    price: 42,
    rating: 4.7,
    reviews: 64,
    stock: 48,
    sku: "VNV-GF-001",
    description:
      "A rigid gift box lined in tissue, sized for a candle, a scarf, or a small stack of objects. The wrapping, already done.",
    features: ["Rigid two-piece box", "Tissue lining", "Ribbon included", "Reusable"],
    specifications: { Size: "10 × 8 × 4 in", Material: "Board + paper wrap", Color: "Ivory", Includes: "Tissue, ribbon" },
  },
  {
    slug: "travel-chess-set",
    name: "Travel Chess Set",
    category: "Gifts",
    categorySlug: "gifts",
    query: "chess set",
    price: 68,
    rating: 4.8,
    reviews: 52,
    stock: 29,
    newArrival: true,
    sku: "VNV-GF-002",
    description:
      "A compact wooden chess set with weighted pieces and a board that folds into its own case. A gift that does not expire in a season.",
    features: ["Weighted wooden pieces", "Folding board case", "Felted bases", "Storage for captured pieces"],
    specifications: { Board: "11 in open", Pieces: "Weighted wood", Case: "Folds closed", Color: "Walnut / maple" },
  },
  {
    slug: "linen-playing-cards",
    name: "Linen Playing Cards",
    category: "Gifts",
    categorySlug: "gifts",
    query: "playing cards",
    price: 16,
    rating: 4.5,
    reviews: 71,
    stock: 110,
    sku: "VNV-GF-003",
    description:
      "A linen-finish deck with a quiet back design. Shuffles well, lasts a season of evenings, and does not look like a novelty.",
    features: ["Linen finish", "Standard poker size", "Two jokers", "Tuck box"],
    specifications: { Size: "Poker", Finish: "Linen", Cards: "54", Design: "Two-color back" },
  },
  {
    slug: "incense-cedar-set",
    name: "Cedar Incense",
    category: "Gifts",
    categorySlug: "gifts",
    query: "incense set",
    forceId: "asset_083",
    price: 18,
    rating: 4.6,
    reviews: 88,
    stock: 73,
    sku: "VNV-GF-004",
    description:
      "A bundle of cedar incense sticks with a slow, even burn. Smoke that smells like a closet done properly, not a souvenir shop.",
    features: ["40 sticks", "Cedar scent", "Slow, even burn", "~25 minutes each"],
    specifications: { Sticks: "40", Scent: "Cedar", Burn: "~25 min each", Origin: "USA" },
  },
  {
    slug: "haven-linen-bedding",
    name: "Haven White Bedding Set",
    category: "Home",
    categorySlug: "home",
    query: "bedding set",
    forceId: "asset_111",
    price: 248,
    rating: 4.8,
    reviews: 96,
    stock: 22,
    featured: true,
    newArrival: true,
    sku: "VNV-HM-022",
    description:
      "Crisp white bedding with a hotel-weight weave and a quiet drape. Duvet, shams, and the particular calm of a well-made bed in morning light.",
    features: ["Hotel-weight cotton sateen", "Duvet cover and shams", "Crisp white", "Machine washable"],
    specifications: { Material: "Cotton sateen", Color: "White", Includes: "Duvet cover + 2 shams", Care: "Machine wash cold" },
  },
  {
    slug: "elm-console-table",
    name: "Elm Console Table",
    category: "Home",
    categorySlug: "home",
    query: "side table",
    forceId: "asset_120",
    price: 398,
    rating: 4.7,
    reviews: 41,
    stock: 8,
    sku: "VNV-HM-023",
    description:
      "A long, low console in solid elm, with a framed top and a stretcher that keeps the line quiet. For an entry, a hall, or the wall that needs a surface rather than a statement.",
    features: ["Solid elm construction", "Framed top", "Stretcher base", "Hand-finished oil"],
    specifications: { Size: "48 × 14 × 32 in", Material: "Elm", Finish: "Natural oil", Use: "Entry / hall" },
  },
];

function pickAsset(query, avoid, forceId) {
  if (forceId) {
    const found = libraryProducts().find((p) => p.id === forceId);
    if (found) return found;
  }
  const styles = ["editorial", "premium", "minimal", "modern", "neutral", undefined];
  for (const style of styles) {
    const asset = pick(query, { style, avoid, seed: hash(query + (style || "any") + "vv-capital") });
    if (asset) return asset;
  }
  return pick(query, { avoid, seed: hash(query + "vv-fallback") });
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function slugifyName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function tsString(value) {
  return JSON.stringify(value);
}

function emitProduct(p) {
  const lines = [];
  lines.push("  {");
  lines.push(`    id: ${tsString(p.id)},`);
  lines.push(`    slug: ${tsString(p.slug)},`);
  lines.push(`    name: ${tsString(p.name)},`);
  lines.push(`    category: ${tsString(p.category)},`);
  lines.push(`    categorySlug: ${tsString(p.categorySlug)},`);
  lines.push(`    images: ${tsString(p.images)},`);
  lines.push(`    description: ${tsString(p.description)},`);
  lines.push(`    features: ${tsString(p.features)},`);
  lines.push(`    specifications: ${tsString(p.specifications)},`);
  lines.push(`    price: ${p.price},`);
  if (p.salePrice) lines.push(`    salePrice: ${p.salePrice},`);
  lines.push(`    rating: ${p.rating},`);
  lines.push(`    reviews: ${p.reviews},`);
  lines.push(`    stock: ${p.stock},`);
  if (p.badge) lines.push(`    badge: ${tsString(p.badge)},`);
  if (p.featured) lines.push("    featured: true,");
  if (p.bestseller) lines.push("    bestseller: true,");
  if (p.newArrival) lines.push("    newArrival: true,");
  lines.push(`    sku: ${tsString(p.sku)},`);
  lines.push("  }");
  return lines.join("\n");
}

async function main() {
  mkdirSync(PUBLIC_PRODUCTS, { recursive: true });
  const avoid = [];
  const usedFiles = new Set();
  const products = [];
  const report = [];
  let reused = 0;

  for (let i = 0; i < CONCEPTS.length; i++) {
    const c = CONCEPTS[i];
    if (c.skip) continue;
    const asset = pickAsset(c.query, avoid, c.forceId);
    if (!asset) {
      report.push({ slug: c.slug, query: c.query, status: "NO MATCH" });
      console.error(`NO MATCH: ${c.slug} ← "${c.query}"`);
      continue;
    }
    avoid.push(asset.id);

    const src = absolutePath(asset);
    if (!existsSync(src)) {
      report.push({ slug: c.slug, query: c.query, status: "MISSING FILE", path: asset.path });
      console.error(`MISSING FILE: ${asset.path}`);
      continue;
    }

    const ext = asset.filename.split(".").pop();
    const destName = `${c.slug}-1.${ext}`;
    const dest = join(PUBLIC_PRODUCTS, destName);
    copyFileSync(src, dest);
    usedFiles.add(asset.filename);

    const images = [`/products/${destName}`];

    // Optional second image: another compatible asset, never a random one.
    const seconds = search(c.query, { avoid, limit: 8 }).filter((p) => p.id !== asset.id);
    const second = seconds.find((p) => p.matchScore >= 8 && !usedFiles.has(p.filename));
    if (second && existsSync(absolutePath(second))) {
      avoid.push(second.id);
      const dest2 = `${c.slug}-2.${second.filename.split(".").pop()}`;
      copyFileSync(absolutePath(second), join(PUBLIC_PRODUCTS, dest2));
      usedFiles.add(second.filename);
      images.push(`/products/${dest2}`);
    }

    if (c.reused) reused++;

    products.push({
      id: `vv-${String(i + 1).padStart(3, "0")}`,
      slug: c.slug,
      name: c.name,
      category: c.category,
      categorySlug: c.categorySlug,
      images,
      description: c.description,
      features: c.features,
      specifications: c.specifications,
      price: c.price,
      salePrice: c.salePrice,
      rating: c.rating,
      reviews: c.reviews,
      stock: c.stock,
      badge: c.badge,
      featured: c.featured,
      bestseller: c.bestseller,
      newArrival: c.newArrival,
      sku: c.sku,
      assetId: asset.id,
      assetName: asset.name,
      assetType: asset.productType,
      assetPath: asset.path,
      reused: Boolean(c.reused),
    });

    report.push({
      slug: c.slug,
      name: c.name,
      query: c.query,
      asset: `${asset.id} ${asset.name} (${asset.productType})`,
      path: asset.path,
      status: "OK",
    });
    console.log(`✓ ${c.slug.padEnd(32)} ← ${asset.id} ${asset.name} [${asset.productType}]`);
  }

  const file = `import { Product } from "@/types";

export const products: Product[] = [
${products.map(emitProduct).join(",\n")},
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductsBySlugs(slugs: readonly string[]): Product[] {
  return slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestsellerProducts(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival);
}

export function getDealProducts(): Product[] {
  return products.filter((p) => p.salePrice);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function getRelatedProducts(product: Product, limit = 8): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export function getEffectivePrice(product: Product): number {
  return product.salePrice ?? product.price;
}
`;

  writeFileSync(OUT_FILE, file);
  writeFileSync(
    join(ROOT, "scripts", "catalog-audit.json"),
    JSON.stringify(
      {
        total: products.length,
        reused,
        reusePercent: Math.round((reused / products.length) * 100),
        uniqueAssets: avoid.length,
        products: products.map((p) => ({
          slug: p.slug,
          name: p.name,
          category: p.category,
          assetId: p.assetId,
          assetName: p.assetName,
          assetType: p.assetType,
          assetPath: p.assetPath,
          images: p.images,
          reused: p.reused,
        })),
        report,
      },
      null,
      2
    )
  );

  console.log(`\nWrote ${products.length} products (${reused} reused / ${Math.round((reused / products.length) * 100)}%).`);
  console.log(`Unique assets used: ${avoid.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

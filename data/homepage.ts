import { Feature, HeroSlide, PromoBanner } from "@/types";

export const utilityBarMessage =
  "Complimentary shipping on orders over $75 · Selected, not stocked.";

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "/hero/hero-1.jpg",
    headline: "Chosen with Care. Lived with Ease.",
    description:
      "A considered edit of objects for the house, the desk, and the days in between.",
    ctaText: "Shop the Edit",
    ctaLink: "/shop",
    secondaryCtaText: "Explore Collections",
    secondaryCtaLink: "/categories",
  },
];

export const brandIntro = {
  eyebrow: "The V&V Point of View",
  title: "Goods selected for how they work, how they look, and how they last.",
  body: "We gather a concise assortment for home, work, travel, and everyday life — useful things with enough presence to keep, and enough restraint to live with.",
};

export const curatedCollections = [
  {
    slug: "home",
    name: "At Home",
    description: "Rooms, light, and objects with a quiet presence.",
    image: "/collections/at-home.jpg",
    href: "/categories/home",
  },
  {
    slug: "kitchen-dining",
    name: "Gather",
    description: "The table, the kitchen, and the meals in between.",
    image: "/collections/gather-kitchen.jpg",
    href: "/categories/kitchen-dining",
  },
  {
    slug: "travel",
    name: "Away",
    description: "Bags and pieces that travel without ceremony.",
    image: "/collections/away-flatlay.jpg",
    href: "/categories/travel",
  },
  {
    slug: "everyday",
    name: "Everyday",
    description: "The small systems that keep a house in order.",
    image: "/collections/everyday-kitchen.jpg",
    href: "/categories/everyday",
  },
  {
    slug: "workspace",
    name: "Workspace",
    description: "Desk objects for a calmer working day.",
    image: "/collections/workspace-desk.jpg",
    href: "/categories/workspace",
  },
  {
    slug: "personal",
    name: "Personal",
    description: "Grooming, carry, and the things that stay close.",
    image: "/collections/personal-bath.jpg",
    href: "/categories/personal",
  },
];

export const homepageFeaturedSlugs = [
  "haven-linen-bedding",
  "rowen-knit-throw",
  "sable-ceramic-vase",
  "halden-floor-lamp",
  "sutton-celadon-plates",
  "weekender-canvas-bag",
  "meridian-flatware-set",
  "elm-console-table",
] as const;

export const homepageEditorial = {
  eyebrow: "In Residence",
  title: "A quieter kind of living room.",
  body: "Textiles, light, and a few objects that earn their place. Not a set, not a lookbook — a room assembled over time.",
  image: "/editorial/residence.jpg",
  ctaText: "Shop Home",
  ctaLink: "/categories/home",
  productSlugs: ["rowen-knit-throw", "sable-ceramic-vase", "halden-floor-lamp"] as const,
};

export const homepageNewArrivalSlugs = [
  "linden-pour-over-set",
  "brookline-teapot",
  "atelier-study-print",
  "yearling-desk-planner",
  "haven-linen-bedding",
  "overland-overshirt",
] as const;

export const homepageEdit = {
  eyebrow: "The V&V Edit",
  title: "Selected for design, utility, quality, and everyday relevance.",
  body: "We do not carry everything. We carry what holds up to daily use and still looks as if someone chose it on purpose.",
  principles: [
    { label: "Design", text: "Form that does not shout." },
    { label: "Utility", text: "Made to be used, not displayed." },
    { label: "Quality", text: "Materials that improve with time." },
    { label: "Relevance", text: "Objects for ordinary, well-lived days." },
  ],
  productSlugs: [
    "millhouse-hand-mill",
    "walnut-serving-board",
    "nile-fountain-pen",
    "folio-leather-wallet",
    "field-desk-lamp",
    "haven-bath-towels",
  ] as const,
};

export const homepageHomeEntertaining = {
  eyebrow: "Home & Entertaining",
  title: "Kitchen, table, and the hours around a meal.",
  body: "Serveware, drinkware, light, and the objects that make a table feel attended to — without turning dinner into a production.",
  image: "/editorial/entertaining-table.jpg",
  ctaText: "Shop Kitchen & Dining",
  ctaLink: "/categories/kitchen-dining",
  rooms: [
    { label: "Kitchen", href: "/categories/kitchen-dining" },
    { label: "Dining", href: "/categories/kitchen-dining" },
    { label: "Serveware", href: "/shop?search=serving" },
    { label: "Drinkware", href: "/shop?search=glass" },
    { label: "Decor", href: "/categories/home" },
    { label: "Lighting", href: "/shop?search=lamp" },
    { label: "Organization", href: "/categories/everyday" },
  ],
  productSlugs: [
    "sutton-celadon-plates",
    "claremont-wine-glasses",
    "grove-serving-bowl",
    "ashford-serving-tray",
    "meridian-flatware-set",
    "pippin-bud-vases",
  ] as const,
};

export const homepageEverydayAway = {
  eyebrow: "Everyday / Away",
  title: "For the commute, the desk, and the overnight.",
  body: "Travel pieces, personal organization, and the small kit of a modern routine.",
  productSlugs: [
    "weekender-canvas-bag",
    "dayline-backpack",
    "cross-town-bag",
    "commute-travel-tumbler",
    "ledger-linen-notebook",
    "entry-key-tray",
    "canopy-umbrella",
    "rise-laptop-stand",
  ] as const,
};

export const homepageBestsellerSlugs = [
  "arden-copper-kettle",
  "elm-white-mugs",
  "rowen-knit-throw",
  "haven-bath-towels",
  "weekender-canvas-bag",
  "commute-travel-tumbler",
  "studio-yoga-mat",
  "folio-leather-wallet",
] as const;

export const secondaryCampaign = {
  eyebrow: "The Long Table",
  title: "Set it once. Use it often.",
  body: "A campaign for the pieces that stay out: plates, glasses, a tray, a bowl. The table as a daily surface, not a special occasion.",
  image: "/editorial/campaign.jpg",
  ctaText: "Shop the Table",
  ctaLink: "/categories/kitchen-dining",
  productSlugs: ["sutton-celadon-plates", "claremont-wine-glasses", "elm-white-mugs"] as const,
};

export const promotionalStrip = {
  title: "New to the house.",
  description: "Bedding, a pour-over set, and a few arrivals chosen for the season ahead.",
  buttonText: "See New Arrivals",
  buttonLink: "/new-arrivals",
};

export const brandPhilosophy = {
  eyebrow: "How We Choose",
  title: "Considered products for modern everyday living.",
  body: "V&V is an edit, not a marketplace. We look for objects with a clear purpose, honest materials, and a visual calm that belongs in a contemporary American house — the kind of rooms found along the Main Line and in Bucks County, without the costume of either.",
  points: [
    "Fewer things, chosen more carefully.",
    "Design that serves daily use.",
    "Quality you can feel in the hand.",
    "A store, not a catalog of everything.",
  ],
};

export const features: Feature[] = [
  {
    id: "1",
    icon: "truck",
    title: "Complimentary Shipping",
    description: "Free standard shipping on orders over $75, delivered in 3–5 business days.",
  },
  {
    id: "2",
    icon: "shield",
    title: "Secure Checkout",
    description: "Your payment information is protected with industry-standard encryption.",
  },
  {
    id: "3",
    icon: "rotate",
    title: "Thirty-Day Returns",
    description: "Unused items may be returned within 30 days, in original condition.",
  },
  {
    id: "4",
    icon: "headphones",
    title: "Customer Care",
    description: "Our team is available Monday through Friday to help with orders and questions.",
  },
];

export const dealsEndTime = new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString();

export const homepageDealsSlugs = [
  "haven-bath-towels",
  "horizon-sunglasses",
] as const;

export const promotionalBanner: PromoBanner = {
  id: "1",
  title: "The season, edited.",
  description:
    "A shorter list of things worth bringing into the house — from the table to the overnight bag.",
  buttonText: "Shop New Arrivals",
  buttonLink: "/new-arrivals",
  image: "/editorial/campaign.jpg",
};

export const aboutSection = {
  title: "An edit, not an inventory.",
  description:
    "V&V Capital LLC selects goods for home, work, travel, and everyday life. We are based in Southampton, Pennsylvania, and we buy the way we live: with attention, and without excess.",
  checklist: [
    "Design, utility, quality, everyday relevance",
    "A concise assortment across the house",
    "Complimentary shipping on orders over $75",
    "Care that answers in one business day",
  ],
  buttonText: "Our Story",
  buttonLink: "/about",
  image: "/editorial/philosophy.jpg",
};

export const featuredCollection = {
  title: "In the House",
  description: "A curated group — not a grid of everything we carry.",
  bannerImage: "/editorial/residence.jpg",
  categorySlug: "home",
};

export const bestSellerTabs = [
  { label: "All", slug: "all" },
  { label: "Home", slug: "home" },
  { label: "Kitchen & Dining", slug: "kitchen-dining" },
  { label: "Travel", slug: "travel" },
  { label: "Personal", slug: "personal" },
];

export const newsletter = {
  title: "Notes from the edit.",
  description: "New arrivals, considered gifts, and the occasional letter. No noise.",
  placeholder: "Email address",
  buttonText: "Subscribe",
};

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

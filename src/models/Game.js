import mongoose from "mongoose";

/* ── System Requirements sub-schema ── */
const sysSpecSchema = new mongoose.Schema(
  {
    os:       { type: String, default: "" },
    cpu:      { type: String, default: "" },
    ram:      { type: String, default: "" },
    gpu:      { type: String, default: "" },
    storage:  { type: String, default: "" },
    directX:  { type: String, default: "" },
    network:  { type: String, default: "" },
  },
  { _id: false }
);

/* ── Button Configuration sub-schema ── */
const buttonSchema = new mongoose.Schema(
  {
    enabled: { type: Boolean, default: false },
    text:    { type: String,  default: "" },
    type:    { type: String,  default: "" }, // e.g. "buy_now" | "wishlist" | "play_now"
    style:   { type: String,  default: "" },
    link:    { type: String,  default: "" },
  },
  { _id: false }
);

/* ── Main Game schema ── */
const gameSchema = new mongoose.Schema(
  {
    // ── Basic Info ──────────────────────────────────
    title:        { type: String, required: true, trim: true },
    slug:         { type: String, trim: true },
    description:  { type: String, default: "" },
    label:        { type: String, default: "" },   // e.g. "New Release"
    category:     { type: String, default: "" },   // e.g. "Action"
    saleOfTheWeek:{ type: String, default: "" },   // e.g. "-30%"
    tag:          { type: String, default: "" },   // e.g. "Bestseller"
    priceText:    { type: String, default: "" },   // e.g. "$19.99"

    // ── Media ────────────────────────────────────────
    image:        { type: String, default: "" },   // main image URL (Cloudinary)
    coverImage:   { type: String, default: "" },   // cover image URL
    screenshots:  { type: [String], default: [] }, // up to 3 screenshot URLs

    // ── Pricing ──────────────────────────────────────
    price:         { type: Number, default: 0 },
    originalPrice: { type: Number, default: 0 },
    currentPrice:  { type: Number, default: 0 },
    discount:      { type: Number, default: 0 },   // percentage e.g. 30

    // ── Dates ────────────────────────────────────────
    availableDate: { type: String, default: "" },  // ISO date string
    releaseDate:   { type: String, default: "" },

    // ── Classification ───────────────────────────────
    sectionType: {
      type: String,
      enum: ["A", "B", "C", "D"],
      default: "A",
    },
    sectionKey: { type: String, default: "" },
    priceType: {
      type: String,
      enum: ["paid", "free", "freemium"],
      default: "paid",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "coming_soon", "early_access"],
      default: "active",
    },

    // ── Relations ────────────────────────────────────
    platforms: { type: [String], default: [] }, // ["PC","PS","Xbox","Mobile","Switch"]
    genres:    { type: [String], default: [] }, // ["Action","RPG", ...]

    // ── Ratings ──────────────────────────────────────
    rating: { type: Number, min: 0, max: 5, default: 0 },

    // ── Visibility flags ─────────────────────────────
    viewMore:       { type: Boolean, default: false },
    viewAll:        { type: Boolean, default: false },
    featured:       { type: Boolean, default: false },
    isFree:         { type: Boolean, default: false },
    totalAvailable: { type: Boolean, default: false },

    // ── Button config ────────────────────────────────
    button: { type: buttonSchema, default: () => ({}) },

    // ── System Requirements ──────────────────────────
    sysMin: { type: sysSpecSchema, default: () => ({}) },
    sysRec: { type: sysSpecSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.model("Game", gameSchema);

// {
//   "title": "Cyber Warrior 2077",
//   "slug": "cyber-warrior-2077",
//   "description": "A futuristic open-world action RPG game.",
//   "label": "New Release",
//   "category": "Action",
//   "saleOfTheWeek": "-30%",
//   "tag": "Bestseller",
//   "priceText": "$19.99",

//   "image": "https://example.com/main.jpg",
//   "coverImage": "https://example.com/cover.jpg",
//   "screenshots": [
//     "https://example.com/shot1.jpg",
//     "https://example.com/shot2.jpg",
//     "https://example.com/shot3.jpg"
//   ],

//   "price": 19.99,
//   "originalPrice": 29.99,
//   "currentPrice": 19.99,
//   "discount": 30,

//   "availableDate": "2026-04-10",
//   "releaseDate": "2026-05-01",

//   "sectionType": "A",
//   "sectionKey": "featured_games",
//   "priceType": "paid",
//   "status": "active",

//   "platforms": ["PC", "PS5", "Xbox"],
//   "genres": ["Action", "RPG", "Adventure"],

//   "rating": 4.5,

//   "viewMore": true,
//   "viewAll": false,
//   "featured": true,
//   "isFree": false,
//   "totalAvailable": true,

//   "button": {
//     "text": "Buy Now",
//     "link": "/buy/cyber-warrior-2077"
//   },

//   "sysMin": {
//     "os": "Windows 10",
//     "cpu": "Intel i5",
//     "ram": "8GB",
//     "gpu": "GTX 1050"
//   },

//   "sysRec": {
//     "os": "Windows 11",
//     "cpu": "Intel i7",
//     "ram": "16GB",
//     "gpu": "RTX 3060"
//   }
// }
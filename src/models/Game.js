import mongoose from "mongoose";
const buttonSchema = new mongoose.Schema({
    enabled: Boolean,
    text: String,
    type: String,
    style: String,
    link: String
}, { _id: false });
const gameSchema = new mongoose.Schema({
    title: String,
    description: String,
    label: String,
    category: String,
    badge: String,
    tag: String,
    priceText: String,
    slug: String,
    image: String,
    coverImage: String,
    screenshots: [String],
    price: Number,
    originalPrice: Number,
    currentPrice: Number,
    discount: Number,
    rating: Number,
    availableDate: String,
    releaseDate: String,
    sectionType: { type: String, default: "grid" },
    gameType: { type: String, default: "game" },
    priceType: { type: String, default: "paid" },
    status: String,
    platforms: [String],
    genres: [String],
    viewMore: Boolean,
    viewAll: Boolean,
    featured: Boolean,
    isFree: Boolean,
    trialAvailable: Boolean,
    button: buttonSchema
}, { timestamps: true });
export default mongoose.model("Game", gameSchema);

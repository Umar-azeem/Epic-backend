import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    gameId:          { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    userId:          { type: String, required: true }, // ref to your users collection
    rating:          { type: Number, min: 1, max: 5, required: true },
    title:           { type: String, default: "" },
    body:            { type: String, default: "" },
    recommended:     { type: Boolean, default: true },
    helpfulVotes:    { type: Number, default: 0 },
    verifiedPurchase:{ type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);

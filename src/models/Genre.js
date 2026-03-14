import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    icon: { type: String, default: "" }, // emoji or URL
  },
  { timestamps: true }
);

export default mongoose.model("Genre", genreSchema);

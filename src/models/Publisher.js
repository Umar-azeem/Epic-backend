import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    slug:        { type: String, trim: true },
    website:     { type: String, default: "" },
    country:     { type: String, default: "" },
    foundedYear: { type: Number, default: null },
    logo:        { type: String, default: "" }, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Publisher", publisherSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 👑 ADMIN ROLE
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ✅ WISHLIST FIELD (ADD THIS)
    wishlist: {
      type: [
        {
          gameId: {
            type: String,
            required: true,
          },
          gameData: {
            type: Object,
            default: {},
          },
          addedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },

    // 🎮 PURCHASED GAMES (OPTIONAL - FOR FUTURE USE)
    purchasedGames: {
      type: [
        {
          gameId: {
            type: String,
            required: true,
          },
          purchasedAt: {
            type: Date,
            default: Date.now,
          },
          price: {
            type: Number,
            default: 0,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
import Game from "../models/Game.js";
import cloudinary from "../config/cloudinary.js";

/* ── Helper ── */
const errMsg = (e) => (e instanceof Error ? e.message : "Unknown error");

/* ── Upload buffer to Cloudinary ── */
const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => (err ? reject(err) : resolve(result.secure_url))
    );
    stream.end(buffer);
  });

/* ═══════════════════════════════════════
   POST /api/games
   Body: multipart/form-data
   Fields: all game fields as JSON string in "data" field
   Files:  image, coverImage, screenshots (up to 3)
═══════════════════════════════════════ */
export const createGame = async (req, res) => {
  try {
    // Parse JSON body sent as "data" field (because of multipart)
    const body = req.body.data ? JSON.parse(req.body.data) : req.body;

    if (!body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const files = req.files || {};

    // Upload main image
    if (files.image?.[0]) {
      body.image = await uploadToCloudinary(files.image[0].buffer, "gamevault/games");
    }

    // Upload cover image
    if (files.coverImage?.[0]) {
      body.coverImage = await uploadToCloudinary(files.coverImage[0].buffer, "gamevault/covers");
    }

    // Upload screenshots (up to 3)
    if (files.screenshots?.length) {
      body.screenshots = await Promise.all(
        files.screenshots.slice(0, 3).map((f) =>
          uploadToCloudinary(f.buffer, "gamevault/screenshots")
        )
      );
    }

    const game = await Game.create(body);
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══════════════════════════════════════
   GET /api/games
   Query params:
     ?status=active
     ?platform=PC
     ?genre=Action
     ?featured=true
     ?priceType=free
     ?search=cyberpunk
     ?sectionType=A
     ?limit=20&page=1
═══════════════════════════════════════ */
export const getGames = async (req, res) => {
  try {
    const { status, platform, genre, featured, priceType, search, sectionType, limit = 50, page = 1 } = req.query;

    const filter = {};

    if (status)      filter.status      = status;
    if (priceType)   filter.priceType   = priceType;
    if (sectionType) filter.sectionType = sectionType;
    if (featured === "true") filter.featured = true;
    if (platform)    filter.platforms   = platform; // array contains
    if (genre)       filter.genres      = genre;
    if (search)      filter.title       = { $regex: search, $options: "i" };

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Game.countDocuments(filter);
    const games = await Game.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    res.json({ total, page: Number(page), limit: Number(limit), games });
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
};

/* ═══════════════════════════════════════
   GET /api/games/:id
═══════════════════════════════════════ */
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══════════════════════════════════════
   PUT /api/games/:id
   Same multipart format as createGame
═══════════════════════════════════════ */
export const updateGame = async (req, res) => {
  try {
    const body  = req.body.data ? JSON.parse(req.body.data) : req.body;
    const files = req.files || {};

    if (files.image?.[0]) {
      body.image = await uploadToCloudinary(files.image[0].buffer, "gamevault/games");
    }
    if (files.coverImage?.[0]) {
      body.coverImage = await uploadToCloudinary(files.coverImage[0].buffer, "gamevault/covers");
    }
    if (files.screenshots?.length) {
      body.screenshots = await Promise.all(
        files.screenshots.slice(0, 3).map((f) =>
          uploadToCloudinary(f.buffer, "gamevault/screenshots")
        )
      );
    }

    const game = await Game.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══════════════════════════════════════
   DELETE /api/games/:id
═══════════════════════════════════════ */
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

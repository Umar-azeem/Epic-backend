import Review from "../models/Review.js";

const errMsg = (e) => (e instanceof Error ? e.message : "Unknown error");

/* ═══ POST /api/reviews ═══ */
export const createReview = async (req, res) => {
  try {
    const { gameId, userId, rating } = req.body;
    if (!gameId || !userId || !rating) {
      return res.status(400).json({ message: "gameId, userId and rating are required" });
    }
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══ GET /api/reviews ═══ */
export const getReviews = async (req, res) => {
  try {
    const { gameId, userId, search } = req.query;
    const filter = {};
    if (gameId) filter.gameId = gameId;
    if (userId) filter.userId = userId;
    if (search) filter.title  = { $regex: search, $options: "i" };

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
};

/* ═══ GET /api/reviews/:id ═══ */
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══ PUT /api/reviews/:id ═══ */
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══ DELETE /api/reviews/:id ═══ */
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

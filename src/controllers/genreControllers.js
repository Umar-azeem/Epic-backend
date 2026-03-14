import Genre from "../models/Genre.js";

const errMsg = (e) => (e instanceof Error ? e.message : "Unknown error");

/* ═══ POST /api/genres ═══ */
export const createGenre = async (req, res) => {
  try {
    if (!req.body.name) return res.status(400).json({ message: "Name is required" });
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══ GET /api/genres ═══ */
export const getGenres = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: "i" } } : {};
    const genres = await Genre.find(filter).sort({ name: 1 });
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
};

/* ═══ GET /api/genres/:id ═══ */
export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.json(genre);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══ PUT /api/genres/:id ═══ */
export const updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.json(genre);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══ DELETE /api/genres/:id ═══ */
export const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.json({ message: "Genre deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

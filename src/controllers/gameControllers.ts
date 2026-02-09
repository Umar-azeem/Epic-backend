import Game from "../models/Game.js";

export const createGame = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteGame = async (req, res) => {
  console.log("DELETE CONTROLLER HIT", req.params.id);

  try {
    const game = await Game.findByIdAndDelete(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

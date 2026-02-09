import Game from "../models/Game.js";
import { Request, Response } from "express";

export const createGame = async (req:Request, res: Response) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
  if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(400).json({ message: "Unknown error occurred" });
  }
}
};

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
  if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(400).json({ message: "Unknown error occurred" });
  }
}
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (error) {
  if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(400).json({ message: "Unknown error occurred" });
  }
}
};

/* ================= UPDATE ================= */
export const updateGame = async (req: Request, res: Response) => {
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
  if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(400).json({ message: "Unknown error occurred" });
  }
}
};

/* ================= DELETE ================= */
export const deleteGame = async (req: Request, res: Response) => {
  console.log("DELETE CONTROLLER HIT", req.params.id);

  try {
    const game = await Game.findByIdAndDelete(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
  if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(400).json({ message: "Unknown error occurred" });
  }
}
};

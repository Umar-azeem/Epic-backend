export const adminOnly = (req, res, next) => {
  try {
    // req.user must come from "protect" middleware
    if (!req.user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only access" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
import Publisher from "../models/Publisher.js";
import cloudinary from "../config/cloudinary.js";

const errMsg = (e) => (e instanceof Error ? e.message : "Unknown error");

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => (err ? reject(err) : resolve(result.secure_url))
    );
    stream.end(buffer);
  });

/* ═══ POST /api/publishers ═══ */
export const createPublisher = async (req, res) => {
  try {
    const body  = req.body.data ? JSON.parse(req.body.data) : req.body;
    const files = req.files || {};

    if (!body.name) return res.status(400).json({ message: "Name is required" });

    if (files.logo?.[0]) {
      body.logo = await uploadToCloudinary(files.logo[0].buffer, "gamevault/publishers");
    }

    const publisher = await Publisher.create(body);
    res.status(201).json(publisher);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══ GET /api/publishers ═══ */
export const getPublishers = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: "i" } } : {};
    const publishers = await Publisher.find(filter).sort({ createdAt: -1 });
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
};

/* ═══ GET /api/publishers/:id ═══ */
export const getPublisherById = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) return res.status(404).json({ message: "Publisher not found" });
    res.json(publisher);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══ PUT /api/publishers/:id ═══ */
export const updatePublisher = async (req, res) => {
  try {
    const body  = req.body.data ? JSON.parse(req.body.data) : req.body;
    const files = req.files || {};

    if (files.logo?.[0]) {
      body.logo = await uploadToCloudinary(files.logo[0].buffer, "gamevault/publishers");
    }

    const publisher = await Publisher.findByIdAndUpdate(req.params.id, body, {
      new: true, runValidators: true,
    });
    if (!publisher) return res.status(404).json({ message: "Publisher not found" });
    res.json(publisher);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

/* ═══ DELETE /api/publishers/:id ═══ */
export const deletePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndDelete(req.params.id);
    if (!publisher) return res.status(404).json({ message: "Publisher not found" });
    res.json({ message: "Publisher deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

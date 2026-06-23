const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/blog");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");

const router = express.Router();

// Helper to check positive numeric string for read time
function isValidReadTime(value) {
  if (!value) return false;
  const num = Number(value);
  return !isNaN(num) && num > 0;
}

router.get("/", async (req, res, next) => {
  try {
    const blogs = await getAll();
    // Simulate slight network delay
    setTimeout(() => {
      res.json({ blogs: blogs });
    }, 1500);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const blog = await get(req.params.id);
    res.json({ blog: blog });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(data.description)) {
    errors.description = "Invalid content.";
  }

  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = "Invalid image.";
  }

  if (!isValidText(data.author)) {
    errors.author = "Invalid author name.";
  }

  if (!isValidReadTime(data.readTime)) {
    errors.readTime = "Invalid read time. Must be a positive number.";
  }

  if (!isValidText(data.category)) {
    errors.category = "Invalid category.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the blog failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "Blog saved.", blog: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(data.description)) {
    errors.description = "Invalid content.";
  }

  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = "Invalid image.";
  }

  if (!isValidText(data.author)) {
    errors.author = "Invalid author name.";
  }

  if (!isValidReadTime(data.readTime)) {
    errors.readTime = "Invalid read time. Must be a positive number.";
  }

  if (!isValidText(data.category)) {
    errors.category = "Invalid category.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the blog failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "Blog updated.", blog: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Blog deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

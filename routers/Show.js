const express = require("express");
const showRouter = express.Router();
const { Show } = require("../models");
const { check, validationResult } = require("express-validator");

// GET route for getting all of the shows

showRouter.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

// GET route for getting a single show

showRouter.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  res.json(show);
});

// POST route for saving a new show

showRouter.post("/", async (req, res) => {
  const show = await Show.create(req.body);
  res.json(show);
});

// DELETE route for deleting shows

showRouter.delete("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  await show.destroy();
  res.json(show);
});

// PUT route for updating shows

showRouter.put("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  await show.update(req.body);
  res.json(show);
});

// GET route for shows genre

showRouter.get("/genre/:genre", async (req, res) => {
  const show = await Show.findAll({ where: { genre: req.params.genre } });
  res.json(show);
});

//PUT route for updating shows rating

showRouter.put(
  "/:id/watched",
  [check("rating").not().isEmpty().trim().isInt()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      let show = await Show.findByPk(req.params.id);
      await show.update(req.body);
      res.json(show);
    }
  }
);

showRouter.put(
  "/:id/updates",
  [
    check("available").not().isEmpty().trim().isLength({ min: 5, max: 25 }),
    check("rating").isEmpty(),
    check("genre").isEmpty(),
    check("title").isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
    } else {
      let show = await Show.findByPk(req.params.id);
      await show.update(req.body);
      res.json(show);
    }
  }
);

module.exports = showRouter;

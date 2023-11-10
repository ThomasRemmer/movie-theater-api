const express = require("express");
const userRouter = express.Router();
const { User } = require("../models");
const { Show } = require("../models");

// GET route for getting all of the users

userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// GET route for getting a single user

userRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

// GET route for getting all of a user's shows

userRouter.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: "shows" });
  res.json(user.shows);
});

// PUT route for adding a show to a user's list

userRouter.put("/:id/shows/:showId", async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: "shows" });
  const show = await Show.findByPk(req.params.showId);
  await user.addShow(show);
  res.json(user);
});

// POST route for saving a new user

userRouter.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// DELETE route for deleting users

userRouter.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json(user);
});

// PUT route for updating users

userRouter.put("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.update(req.body);
  res.json(user);
});

module.exports = userRouter;

import express from "express";
import bcrypt from "bcrypt";
import { db } from "../index.js";
import {
  requireEmail,
  requireUsername,
  requirePassword,
  requireUsernameExists,
  requireValidPassword,
} from "./validators.js";
import { handleErrors } from "../middlewares/errorMiddlewares.js";
import { requireAuth } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post(
  "/api/signup",
  [requireEmail, requireUsername, requirePassword],
  handleErrors("/signup"),
  async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await db.collection("users").insertOne({
        username,
        password: hashedPassword,
        email,
        type: "basic",
      });
      req.session.userId = user.insertedId.toString();
      req.session.user = username;
      const redirectUrl = req.body.path ? req.body.path : "/";
      return res.status(200).json({ redirectUrl, username: username });
    } catch (err) {
      return res.status(500).json({
        redirectUrl: "/signup",
        error: "An error occured during user creation.",
      });
    }
  }
);

router.post(
  "/api/login",
  [requireUsernameExists, requireValidPassword],
  handleErrors("/login"),
  async (req, res) => {
    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });
    req.session.userId = user._id.toString();
    req.session.user = user.username;
    const redirectUrl = req.body.path ? req.body.path : "/";
    res.json({ redirectUrl, username: user.username });
  }
);

router.get("/api/current_user", requireAuth, (req, res) => {
  res.send(req.session.user);
});

router.get("/api/logout", (req, res) => {
  req.session = null;
  return res.status(200).json({ redirectUrl: "/" });
});

export default router;

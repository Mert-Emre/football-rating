import express from "express";
import { requireAuth } from "../middlewares/authMiddlewares.js";
import { db } from "../index.js";

const router = express.Router();

router.post("/api/save-score", requireAuth, async (req, res) => {
  try {
    const { players, managers, id } = req.body;
    if (isNaN(id)) {
      throw new Error("Match not found.");
    }
    const matchScores = await db
      .collection("playerScores")
      .findOne({ id: Number(id) });
    if (!matchScores) {
      throw new Error("Match not found.");
    }
    try {
      const scoreInDb = await db
        .collection("userScores")
        .findOne({ userId: req.session.id, matchId: id });
      if (scoreInDb) {
        throw new Error("The user already has a record for this match.");
      }
    } catch (err) {
      res.status(403).json({ redirectUrl: "/", message: err });
    }
    const updateFields = { totalVotes: 1 };

    Object.keys(matchScores.players).forEach((player) => {
      const score = players[player];
      if (isNaN(score) || score > 10 || score < 1 || !Number.isInteger(score)) {
        throw new Error("Wrong score format.");
      }
      updateFields[`players.${player}`] = score;
    });

    Object.keys(matchScores.managers).forEach((manager) => {
      const score = managers[manager];
      if (isNaN(score) || score > 10 || score < 1 || !Number.isInteger(score)) {
        throw new Error("Wrong score format.");
      }
      updateFields[`managers.${manager}`] = score;
    });

    const prom1 = db.collection("userScores").insertOne({
      players,
      managers,
      matchId: id,
      userId: req.session.userId,
    });

    const prom2 = db
      .collection("playerScores")
      .findOneAndUpdate(
        { id: Number(id) },
        { $inc: updateFields },
        { returnDocument: "after" }
      );
    await prom1;
    const newData = await prom2;
    res.json({
      playersTotal: newData.players,
      managersTotal: newData.managers,
      players,
      managers,
      totalVotes: newData.totalVotes,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/check-user-score/:id", requireAuth, async (req, res) => {
  try {
    const scoreInDb = await db
      .collection("userScores")
      .findOne({ userId: req.session.userId, matchId: req.params.id });
    if (scoreInDb) {
      return res
        .status(403)
        .json({ managers: scoreInDb.managers, players: scoreInDb.players });
    }
    res.send();
  } catch (err) {
    res.status(500).json({ redirectUrl: "/", message: err });
  }
});

router.get("/api/get-total-scores/:id", async (req, res) => {
  try {
    const data = await db
      .collection("playerScores")
      .findOne({ id: Number(req.params.id) });
    if (!data) throw new Error("Match not found.");
    res.json({
      players: data.players,
      managers: data.managers,
      totalVotes: data.totalVotes,
    });
  } catch (err) {
    res.status(404).send(err);
  }
});

export default router;

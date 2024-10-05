import express from "express";
import { db } from "../index.js";

const router = express.Router();

router.get("/api/fixture/:date", async (req, res) => {
  let reqDate;
  try {
    new Date(req.params.date);
    reqDate = parseInt(req.params.date);
  } catch (err) {
    return res.status(400).send("Invalid date");
  }
  const cursor = db.collection("matchList").find({
    timestamp: {
      $gte: reqDate,
      $lt: reqDate + 86400000,
    },
  });
  const matches = await cursor.toArray();
  res.json(matches);
});

router.get("/api/match/:matchId", async (req, res) => {
  const matchId = new Number(req.params.matchId);
  if (isNaN(matchId)) return res.status(400).send("Invalid match id.");
  const match = await db
    .collection("detailedMatchInfo")
    .findOne({ id: parseInt(req.params.matchId) });
  res.json(match);
});

export default router;

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/healthz", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "backend",
  });
});

router.get("/readyz", (_req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    status: ready ? "ready" : "not-ready",
    mongoReadyState: mongoose.connection.readyState,
  });
});

module.exports = router;

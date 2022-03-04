const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/offer/publish", isAuthenticated, (req, res) => {
  console.log("Offer", req.user);
  res.json("hello");
});

module.exports = router;

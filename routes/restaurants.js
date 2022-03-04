const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

router.get("/restaurants", async (req, res) => {
  try {
    const response = await axios.get(
      `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json`
    );
    const data = response.data;
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;

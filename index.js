require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {});

const userRoutes = require("./routes/user");
app.use(userRoutes);
const offerRoutes = require("./routes/offer");
app.use(offerRoutes);
const restaurantsRoutes = require("./routes/restaurants");
app.use(restaurantsRoutes);

// app.all("*", (req, res) => {
//   res.json("page not found");
// });
app.get("/", (req, res) => {
  res.status(200).json("Welcome to the signup/login");
});
app.listen(process.env.PORT, () => {
  console.log("server started");
});

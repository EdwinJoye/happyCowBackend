const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  const { username, email, password } = req.fields;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(409).json({ message: "this email already has an account" });
    } else {
      if (username && email && password) {
        // 1 encrypter le mot de passe
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(password + salt).toString(encBase64);
        // 2 créer un nouvel user
        const newUser = new User({
          email: email,
          account: {
            username: username,
          },
          token: token,
          hash: hash,
          salt: salt,
        });
        // 3 sauvegarder le nouvel user dans la base de donnée
        await newUser.save();
        // 4 répondre au client
        res.status(200).json({
          _id: newUser._id,
          token: newUser.token,
          account: newUser.account,
        });
      } else {
        res.status(400).json({ message: "missing parameters" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json("SignUp");
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.fields;
    // chercher quel utilisateur veut se connecter ?
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      // s'il existe on fait la suite
      // vérifier que le mot de passe est le bon
      const hashToVerify = SHA256(password + user.salt).toString(encBase64);
      if (hashToVerify === user.hash) {
        res.status(200).json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      // sinon on renvoie "unauthorized"
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

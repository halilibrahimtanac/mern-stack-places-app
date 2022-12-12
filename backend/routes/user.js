const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const fileUpload = require("../middleware/imageUpload");

router.post("/", async (req, res, next) => {
  const user = req.body;

  const r = await User.findOne({
    userName: user.username,
  });
  if (r) {
    let isValid = await bcrypt.compare(user.password, r.password);
    if (isValid) {
      let token = jwt.sign({ userId: r.id }, "token_secret_key", {
        expiresIn: "1h",
      });

      return res.json({
        user: {
          _id: r._id,
          name: r.name,
          userName: r.userName,
          url: r.url,
          token: token,
        },
        isError: false,
      });
    }
    return res
      .status(404)
      .json({ isError: true, message: "Wrong username or password" });
  }
});

router.post("/sign-up", fileUpload.single("image"), async (req, res, next) => {
  const userInfo = req.body;
  console.log(userInfo);

  let hashedPassword = await bcrypt.hash(userInfo.password, 12);

  try {
    const r = await User.findOne({ userName: userInfo.username });
    if (!r) {
      const createdUser = new User({
        name: userInfo.name,
        userName: userInfo.username,
        password: hashedPassword,
        url: req.file.path,
      });
      const rs = await createdUser.save();

      let token = jwt.sign({ userId: rs.id }, "token_secret_key", {
        expiresIn: "1h",
      });

      console.log(rs);

      return res.status(201).json({
        name: rs.name,
        _id: rs.id,
        userName: rs.userName,
        url: rs.url,
        token: token,
        isError: false,
      });
    }
    throw new Error("User already exists");
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, () =>
        console.log("User didn't sign up, picture removed.")
      );
    }

    res.status(500).json({ isError: true, message: err.message });
  }
});

module.exports = router;

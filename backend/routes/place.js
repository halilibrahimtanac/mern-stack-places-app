const Place = require("../models/placeModel");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const fileUpload = require("../middleware/imageUpload");
const fs = require("fs");

router.get("/:uid", (req, res, next) => {
  Place.find()
    .then((r) => {
      if (r.length > 0) {
        return res.status(200).json({ places: r, isError: false });
      }
      throw new Error("Cannot find place");
    })
    .catch((e) => res.status(404).json({ isError: true, message: e.message }));
});

router.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[1] &&
      jwt.verify(req.headers.authorization.split(" ")[1], "token_secret_key")
    ) {
      let reqTkn = req.headers.authorization.split(" ")[1];
      let isValid = jwt.verify(reqTkn, "token_secret_key");
      req.userData = isValid.userId;
      return next();
    }

    throw new Error("Auth error");
  } catch (err) {
    return res.status(401).json({ isError: true, message: err.message });
  }
});

router.get("/edit/:placeID", (req, res) => {
  Place.findById(req.params.placeID)
    .then((r) => {
      if (r.creatorUserId === req.userData) {
        return res.status(200).json(r);
      }
      throw new Error("Auth error");
    })
    .catch((e) => res.status(404).json({ isError: true, error: e.message }));
});

router.post("/create-place", fileUpload.single("image"), async (req, res) => {
  const placeBody = req.body;

  try {
    const newPlace = new Place({
      placeName: placeBody.placeName,
      placePic: req.file.path,
      creatorUserId: placeBody.creatorUserId,
    });
    newPlace.save().then((r) => res.status(201).json(r));
  } catch {
    if (req.file) {
      fs.unlink(req.file.path, () =>
        console.log("Place didn't add, picture removed")
      );
    }
    res.status(500).json({ isError: true });
  }
});

router.patch("/:placeID", fileUpload.single("image"), (req, res) => {
  const { placeID } = req.params;
  const placeBody = req.body;
  console.log(placeBody);

  Place.findById(placeID)
    .then((place) => {
      place.placeName = placeBody.placeName;
      place.placePic = req.file.path;
      return place.save();
    })
    .then((r) => res.status(201).json({ ...r, isError: false }))
    .catch((e) => res.status(500).json({ isError: true, error: e }));
});

module.exports = router;

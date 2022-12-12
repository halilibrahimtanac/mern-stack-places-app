const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const placeRouter = require("./routes/place");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Methods",
    "Origin, X-Requested-With, Content-Type, Accept",
    "Authorization"
  );
  next();
});

app.use(cors());

app.use("/uploads", express.static(path.join("uploads")));

app.use("/place", placeRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message });
});

app.use("/user", userRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message });
});

mongoose
  .connect()
  .then(() => {
    app.listen(5000, () => console.log("Server started at 5000 port"));
  })
  .catch(() => console.log("error occured"));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const recipeRoute = require("./routes/recipe-route");
const commentRoute = require("./routes/comment-route");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "/public/uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))
  .catch(() => console.log("Error"));

// routes
app.use("/api", recipeRoute);
app.use("/api", commentRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Recipe app listening on port ${port}!`));

module.exports = app;

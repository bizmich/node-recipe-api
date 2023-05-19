const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Recipe app listening on port ${port}!`));

module.exports = app;

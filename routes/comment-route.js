const express = require("express");
const { createComment } = require("../controllers/comment-controller");
const router = express.Router();

router.post("/comment", createComment);

module.exports = router;

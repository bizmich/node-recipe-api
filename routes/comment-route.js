const express = require("express");
const {
  createComment,
  deleteComment,
  updateComment,
} = require("../controllers/comment-controller");
const router = express.Router();

router.post("/comment", createComment);
router.delete("/comment/:id", deleteComment);
router.put("/comment/:id", updateComment);

module.exports = router;

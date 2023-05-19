const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  commentedAt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);

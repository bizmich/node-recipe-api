const CommentSchema = require("../model/comment-model");

// creating a recipe
module.exports.createComment = async (req, res) => {
  const commentData = {
    commentedAt: new Date().toDateString(),
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    recipeId: req.body.recipeId,
  };

  await CommentSchema.create(commentData)
    .then((doc) => {
      console.log("doc:", doc);

      res.status(200).json({
        list: doc,
      });
    })
    .catch((err) =>
      res.status(404).json({
        message: err.message,
      })
    );
};

// updating a recipe
module.exports.updateComment = async (req, res) => {
  const id = req.params.id;

  console.log("id:", id);

  const CommentData = {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
  };

  console.log("CommentData:", CommentData);

  await CommentSchema.findByIdAndUpdate(id, CommentData)
    .then((doc) => {
      res.status(200).json({
        message: "Updated successfully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err.message,
      });
    });
};
// delete a recipe
module.exports.deleteComment = async (req, res) => {
  const id = req.params.id;

  console.log("id:", id);

  await CommentSchema.findByIdAndRemove(id)
    .then((doc) => {
      res.status(200).json({
        message: "Delete successfully",
      });
    })
    .catch((err) =>
      res.status(404).json({
        message: err.message,
      })
    );
};

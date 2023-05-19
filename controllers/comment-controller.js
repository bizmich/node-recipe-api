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

// get by id
module.exports.getRecipeById = async (req, res) => {
  await CommentSchema.findById(req.params.id)
    .then((doc) => {
      const filteredRecipes = {
        createdDate: doc.createdDate,
        description: doc.description,
        image: doc.image,
        ingredient: doc.ingredient,
        name: doc.name,
        cookingTime: doc.cookingTime,
        rate: doc.rate,
        id: doc._id,
      };

      res.status(200).json({
        ...filteredRecipes,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Произошла ошибка",
        error: error,
      });
    });
};

// updating a recipe
module.exports.updateRecipe = async (req, res) => {
  const id = req.body.id;

  const recipeData = {
    createdDate: new Date().toISOString(),
    description: req.body.description,
    image: "image",
    ingredient: req.body.ingredient,
    name: req.body.name,
    cookingTime: req.body.cookingTime,
    rate: req.body.rate,
  };

  await CommentSchema.findByIdAndUpdate(id, recipeData)
    .then((doc) => {
      res.status(200).json({
        message: "Updated successfully",
      });
    })
    .catch((err) => console.log("Error", err));
};

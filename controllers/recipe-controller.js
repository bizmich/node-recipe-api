const RecipeSchema = require("../model/recipe-model");
const CommentSchema = require("../model/comment-model");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../config/firebase.config");

initializeApp(config.firebaseConfig);
const storage = getStorage();

// getting all recipe
module.exports.getAllRecipe = async (req, res) => {
  await RecipeSchema.find()
    .then((doc) => {
      const filteredRecipes = doc.map((el) => {
        return {
          createdDate: el.createdDate,
          description: el.description,
          image: el.image,
          ingredient: el.ingredient,
          name: el.name,
          cookingTime: el.cookingTime,
          rate: el.rate,
          id: el._id,
          viewCount: el.viewCount,
        };
      });
      res.status(200).json({
        list: filteredRecipes,
        count: doc.length,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Произошла ошибка",
        error: error,
      });
    });
};

// creating a recipe
module.exports.createRecipe = async (req, res) => {
  console.log(req.file);

  const giveCurrentDateTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    return dateTime;
  };
  try {
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `files/${req.file.originalname + "       " + dateTime}`
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("downloadURL:", downloadURL);

    const recipeData = {
      createdDate: new Date().toISOString(),
      description: req.body.description,
      image: downloadURL,
      ingredient: req.body.ingredient.split(","),
      name: req.body.name,
      cookingTime: req.body.cookingTime,
      rate: req.body.rate,
    };

    await RecipeSchema.create(recipeData)
      .then((doc) => {
        console.log("doc:", doc);

        res.status(200).json({
          list: doc,
        });
      })
      .catch((err) => console.log("Error", err));

    // console.log("File successfully uploaded.");
    // return res.send({
    //   message: "file uploaded to firebase storage",
    //   name: req.file.originalname,
    //   type: req.file.mimetype,
    //   downloadURL: downloadURL,
    // });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// get by id
module.exports.getRecipeById = async (req, res) => {
  await RecipeSchema.findByIdAndUpdate(
    req.params.id,
    { $inc: { viewCount: 1 } },
    { new: true }
  );

  const response = await CommentSchema.find({ recipeId: req.params.id }).sort({
    _id: -1,
  });

  const filteredComments = response.map((c) => {
    return {
      comment: c.comment,
      commentedAt: c.commentedAt,
      email: c.email,
      name: c.name,
      recipeId: c.recipeId,
      id: c._id,
    };
  });

  await RecipeSchema.findById(req.params.id)
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
        comments: filteredComments,
        viewCount: doc.viewCount,
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
// get by id and update rating
module.exports.getRecipeByIdAndUpdateRating = async (req, res) => {
  await RecipeSchema.findByIdAndUpdate(
    req.body.id,
    { rate: req.body.rate },
    { new: true }
  )
    .then((doc) => {
      res.status(200).json({
        message: "Success",
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
  const id = req.params.id;

  const recipeData = {
    createdDate: new Date().toISOString(),
    description: req.body.description,
    image: "image",
    ingredient: req.body.ingredient,
    name: req.body.name,
    cookingTime: req.body.cookingTime,
    rate: req.body.rate,
  };

  await RecipeSchema.findByIdAndUpdate(id, recipeData)
    .then((doc) => {
      res.status(200).json({
        message: "Updated successfully",
      });
    })
    .catch((err) => console.log("Error", err));
};

// updating a recipe
module.exports.deleteRecipe = async (req, res) => {
  const id = req.params.id;

  await RecipeSchema.findByIdAndRemove(id)
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

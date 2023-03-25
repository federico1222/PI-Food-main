const express = require("express");
const router = express.Router();

const {
  getAllRecipe,
  findRecipeByTitle,
  getRecipeById,
  createdRecipe,
} = require("../controllers/controllers");

router.get("/", async (req, res) => {
  let recipe;
  try {
    const { title } = req.query;
    if (title) {
      recipe = await findRecipeByTitle(title);
    } else {
      recipe = await getAllRecipe();
    }
    if (!recipe || Object.keys(recipe).length === 0) {
      res
        .status(404)
        .send(`¡Lo siento! La receta de nombre ${'"' + title + '"'} no existe`);
    } else {
      res.status(200).send(recipe);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const totalRecipe = await getRecipeById(id);
    if (!totalRecipe || Object.keys(totalRecipe).length === 0) {
      res.status(404).send(`¡Lo siento! El id ${id} ingresado no existe`);
    }
    res.status(200).send(totalRecipe);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let {
      title,
      Imagen,
      SumamaryOfTheDish,
      HealthyFoodLevel,
      StepByStep,
      createInDb,
      diets,
    } = req.body;
    if (!Array.isArray(diets)) {
      return res.status(400).json({
        error: "El campo 'diets' debe ser un array de cadenas de texto",
      });
    }
    let newRecipe = await createdRecipe(
      title,
      Imagen,
      SumamaryOfTheDish,
      HealthyFoodLevel,
      StepByStep,
      createInDb,
      diets
    );

    res.status(200).send(newRecipe);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { getAlldiets } = require("../controllers/controllers");
const { Diets } = require("../db");

router.get("/", async (req, res) => {
  try {
    const diets = await getAlldiets();
    for (const Diet of diets) {
      await Diets.findOrCreate({
        where: { name: Diet },
      });
    }
    const allDiets = await Diets.findAll();
    res.send(allDiets.map((element) => element));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al agregar las dietas");
  }
});

// 1-el código itera sobre cada dieta y utiliza el método "findOrCreate()" 
// del modelo Diets para buscar una dieta existente con el nombre correspondiente o 
// crear una nueva dieta si no existe

// 2-Después de crear o buscar todas las dietas, se recupera una lista de todas las dietas 
// de la base de datos utilizando el método "findAll()" del modelo Diets.

// 3-se devuelve una respuesta HTTP al cliente con una lista de nombres de todas las dietas 
// recuperadas de la base de datos.

module.exports = router;


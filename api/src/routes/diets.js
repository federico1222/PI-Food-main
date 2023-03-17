const express = require("express");
const router = express.Router();
const { diets } = require("../controllers/controllers");
const { Diets } = require("../db");

router.get("/", async (req, res) => {
  try {
    diets.forEach((element) => {
      Diets.findOrCreate({
        where: { name: element.name },
      });
    });
    const allDiets = await Diets.findAll();
    res.send(allDiets.map(element => element.name))
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;

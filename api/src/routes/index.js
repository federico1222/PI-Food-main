const { Router } = require("express");
const express = require("express");
const dietsRouter = require("../routes/diets");
const recipeRouter = require("../routes/recipe");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());
router.use("/recipes", recipeRouter);
router.use("/diets", dietsRouter);

module.exports = router;

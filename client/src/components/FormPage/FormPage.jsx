import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { createRecipe, getDiets} from "../../redux/actions";
import styles from "../FormPage/FormPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import imgForm from "../../assets/imfForm.png";
import imgEat from "../../assets/eatright.png";
import tituloForm from "../../assets/tituloForm.png";
const validation = (input) => {
  const errors = {};

  if (!input.title) {
    errors.title = "El título es obligatorio";
  }

  if (!input.Imagen) {
    errors.Imagen = "La URL de la imagen es obligatoria";
  }

  if (!input.SumamaryOfTheDish) {
    errors.SumamaryOfTheDish = "El resumen del plato es obligatorio";
  }

  if (!input.HealthyFoodLevel) {
    errors.HealthyFoodLevel = "El nivel de salud es obligatorio";
  } else if (input.HealthyFoodLevel < 1 || input.HealthyFoodLevel > 100) {
    errors.HealthyFoodLevel = "El nivel de salud debe estar entre 1 y 100";
  }

  if (!input.StepByStep) {
    errors.StepByStep = "Los pasos de la receta son obligatorios";
  }

  return errors;
};

const FormPage = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    Imagen: "",
    SumamaryOfTheDish: "",
    HealthyFoodLevel: "",
    StepByStep: "",
    diets: [],
  });

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }
  function handleSelect(event) {
    setInput({
      ...input,
      diets: [...input.diets, event.target.value],
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    const errors = validation(input);
    if (Object.keys(errors).length > 0) {
      // Si hay errores, mostrarlos al usuario
      alert('Por favor corrige los siguientes errores:\n\n' + Object.values(errors).join('\n'));
    } else {
      // Si no hay errores, enviar el formulario
      dispatch(createRecipe(input));
      alert("Recipes create!");
      setInput({
        title: "",
        Imagen: "",
        SumamaryOfTheDish: "",
        HealthyFoodLevel: "",
        StepByStep: "",
        diets: [],
      });
    }
  }
  
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={styles.containerForm}>
      <NavBar />
      <div className={styles.form}>
        <div className={styles.containerColor}>
          <div className={styles.tituloForm}>
            <div className={styles.logo}>
              <img src={tituloForm} alt="" />
            </div>
            <div className={styles.titulo}>
              <h1>Create Recipes</h1>
              <p>
                Share your recipes with our community! Create your own versions,
                share your culinary secrets and be the chef of your own kitchen
              </p>
            </div>
          </div>
          <div className={styles.imgForm}>
            <img src={imgForm} alt="" />
          </div>
        </div>
        <div className={styles.formRecipes}>
          <div className={styles.slogan}>
            <img src={imgEat} alt="" />
          </div>
          <form
            className={styles.Form}
            action=""
            onSubmit={(event) => handleSubmit(event)}
          >
            <h1>Create</h1>
            <div className={styles.inputDiv}>
              <input
                onChange={handleChange}
                type="text"
                value={input.title}
                name="title"
                placeholder="Title..."
              />
            </div>
            <div className={styles.inputDiv}>
              <input
                onChange={handleChange}
                type="text"
                value={input.Imagen}
                name="Imagen"
                placeholder="Url image..."
              />
            </div>
            <div className={styles.inputDiv}>
              <input
                type="text"
                value={input.SumamaryOfTheDish}
                name="SumamaryOfTheDish"
                onChange={handleChange}
                placeholder="SumaryOfTheDish..."
              />
            </div>
            <div className={styles.inputDiv}>
              <input
                type="number"
                value={input.HealthyFoodLevel}
                name="HealthyFoodLevel"
                onChange={handleChange}
                placeholder="HealthyFoodLevel..."
              />
            </div>
            <div className={styles.inputDiv}>
              <input
                type="text"
                value={input.StepByStep}
                name="StepByStep"
                onChange={handleChange}
                placeholder="StepByStep..."
              />
            </div>
            <div className={styles.inputDiv}>
              <select onChange={(event) => handleSelect(event)}>
                {diets.map((diet, i) => {
                  return (
                    <option key={i} value={diet.name}>
                      {diet.name}
                    </option>
                  );
                })}
              </select>
              <div className={styles.listDiet}>
                {input.diets.map((diet) => {
                  return (
                    <div className={styles.optionsDiet}>
                      <p>{diet}</p>
                    </div>
                  );
                })}
              </div>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;

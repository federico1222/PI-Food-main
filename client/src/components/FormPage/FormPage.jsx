import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { createRecipe, getDiets } from "../../redux/actions";
import styles from "../FormPage/FormPage.module.css";
import { useDispatch, useSelector } from "react-redux";

const FormPage = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
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
    console.log(input);
    dispatch(createRecipe(input));
    alert("personaje creado!");
    setInput({
      title: "",
      Imagen: "",
      SumamaryOfTheDish: "",
      HealthyFoodLevel: "",
      StepByStep: "",
      diets: [],
    });
  }
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  return (
    <div className={styles.containerForm}>
      <NavBar />
      <div className={styles.form}>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
        <div>
            <label>Title:</label>
            <input
              onChange={handleChange}
              type="text"
              value={input.title}
              name="title"
            />
          </div>
          <div>
            <label>Imagen:</label>
            <input
              onChange={handleChange}
              type="text"
              value={input.Imagen}
              name="Imagen"
            />
          </div>
          <div>
            <label>SumamaryOfTheDish:</label>
            <input
              type="text"
              value={input.SumamaryOfTheDish}
              name="SumamaryOfTheDish"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>HealthyFoodLevel:</label>
            <input
              type="number"
              value={input.HealthyFoodLevel}
              name="HealthyFoodLevel"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>StepByStep:</label>
            <input
              type="text"
              value={input.StepByStep}
              name="StepByStep"
              onChange={handleChange}
            />
          </div>
          <div>
            <select onChange={(event) => handleSelect(event)}>
              {diets.map((diet, i) => {
                return (
                  <option key={i} value={diet.name}>
                    {diet.name}
                  </option>
                );
              })}
            </select>
            <div>
              <ul>
                <li>{input.diets.map((diet) => diet)}</li>
              </ul>
            </div>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;

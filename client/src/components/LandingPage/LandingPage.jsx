import React from "react";
import styles from "../LandingPage/LandingPage.module.css";
import iconoLanding from "../../assets/icono-titulo.png";
import Food from "../../assets/platoComida.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Login from "../Login/Login";
import sponnocular from '../../assets/sponocular.png'

const LandingPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleCloseGameDetails = () => {
    setSelectedTag(null);
  };

  return (
    <>
      <div className={styles.containerNav}>
        <div className={styles.logoLanding}>
          <img src={iconoLanding} alt="" />
        </div>
        <div className={styles.linksLanding}>
        <button onClick={() => setSelectedTag("explore")}>EXPLORE</button>
          <button onClick={() => setSelectedTag("app")}>API</button>
          <button onClick={() => setSelectedTag("about")}>ABOUT ME</button>
          <button onClick={() => setSelectedTag("contact")}>CONTACT US</button>
        </div>
        <div className={styles.LoginRegister}>
          <Login />
        </div>
      </div>
      <div className={styles.containerLangindPage}>
        <div className={styles.colOne}>
          <h1>
            FOOD         
          </h1>
          <h2>Discover Diets & <br /> Delicious Food</h2>
          <Link to={"/HomePage"}>
            <button className={styles.buttona}>Explore</button>
          </Link>
        </div>
        <div className={styles.colTwo}>
          <img src={Food} alt="" />
        </div>
      </div>
      {selectedTag && (
        <div className={styles.selectedInfo}>
          {selectedTag === "explore" && (
            <div className={styles.aboutme}>
              <h1>EXPLORE</h1>
              <p>
                Mi aplicación es una herramienta fácil de usar para descubrir
                nuevas recetas y encontrar inspiración para tus comidas diarias.
                Se conecta directamente con la API de comidas Spoonacular para
                ofrecerte una gran cantidad de opciones de recetas, con fotos
                hermosas y una descripción detallada de cada plato. Puedes
                buscar por palabras clave como tipo de comida, ingrediente o
                tiempo de preparación, o navegar por nuestras colecciones
                cuidadosamente seleccionadas de recetas populares, saludables o
                temáticas para encontrar la receta perfecta para ti.
              </p>
            </div>
          )}
          {selectedTag === "about" && (
            <div className={styles.aboutme}>
              <h1>About Me</h1>
              <p>
                Hola mi nombre es Federico Asaad, Programador web full stack con
                23 años de edad y una gran pasión por el desarrollo web y el
                diseño en general. Mi experiencia en el campo de la programación
                web se ha desarrollado a través de proyectos en los que he
                trabajado en una variedad de lenguajes y tecnologías.
                Actualmente me encuentro en la búsqueda de mi primer empleo en
                el sector IT para poder desarrollar mis habilidades y
                evolucionar en mi área, ya que busco oportunidades que me
                permitan hacerlo, alineándome paralelamente con los objetivos de
                la empresa.
              </p>
            </div>
          )}
          {selectedTag === "app" && (
            <div className={styles.app}>
              <h1>API</h1>
              <img src={sponnocular} alt="" width={'700px'}/>
              <p>https://spoonacular.com/food-api</p>
            </div>
          )}
          {selectedTag === "contact" && (
            <div className={styles.aboutme}>
              <h1>CONTACT</h1>
              <p>https://www.linkedin.com/in/federicoasaad/</p>
              <p>https://github.com/federico1222/</p>
            </div>
          )}
          <button onClick={handleCloseGameDetails}>Back</button>
        </div>
      )}
    </>
  );
};

export default LandingPage;

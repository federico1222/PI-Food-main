import { useState, useEffect } from "react";
import styles from "./Carrusel.module.css";
import diets from "./img";
import { TbSquareRoundedArrowLeftFilled,TbSquareRoundedArrowRightFilled } from 'react-icons/tb';

const Carrusel = () => {
  const [currentImage, setCurrentImage] = useState(4); // Inicializamos el estado en 4 para mostrar las primeras 5 imágenes
  const [slideClass, setSlideClass] = useState(""); // Clase CSS para la transición de las imágenes

  useEffect(() => {
    if (slideClass) {
      setTimeout(() => {
        setSlideClass("");
      }, 500); // Espera 0.5 segundos antes de eliminar la clase CSS
    }
  }, [slideClass]);

  const handlePrev = () => {
    setCurrentImage(
      currentImage === 4 
        ? diets.length - 1
        : currentImage - 1
    );
    setSlideClass(styles.slideRight); // Agrega la clase CSS para la transición a la derecha
  };

  const handleNext = () => {
    setCurrentImage(
      currentImage === diets.length - 1 
        ? 4
        : currentImage + 1
    );
    setSlideClass(styles.slideLeft); 
  };

  return (
    <div className={styles.container}>
      <button onClick={handlePrev} className={styles.buttonA}><TbSquareRoundedArrowLeftFilled/></button>
      <div className={styles.slider}>
        {
          diets.slice(currentImage - 4, currentImage + 1).map((element)=> { 
            return(
              <img 
                src={element.src} 
                alt="" 
                key={element.id} 
                className={`${styles.slide} ${slideClass}`} 
              />
            )
          })
        }
      </div>
      <button onClick={handleNext} className={styles.buttonA}><TbSquareRoundedArrowRightFilled/></button>
    </div>
  );
};

export default Carrusel;









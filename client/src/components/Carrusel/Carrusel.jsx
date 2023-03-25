import { useState, useEffect } from "react";
import styles from "./Carrusel.module.css";
import diets from "./img";
import { TbSquareRoundedArrowLeftFilled,TbSquareRoundedArrowRightFilled } from 'react-icons/tb';

const Carrusel = () => {
  const [currentImage, setCurrentImage] = useState(4); 
  const [slideClass, setSlideClass] = useState(""); 

  useEffect(() => {
    if (slideClass) {
      setTimeout(() => {
        setSlideClass("");
      }, 500); 
    }
  }, [slideClass]);

  const handlePrev = () => {
    setCurrentImage(
      currentImage === 4 
        ? diets.length - 1
        : currentImage - 1
    );
    setSlideClass(styles.slideRight); 
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
          diets.slice(currentImage - 4, currentImage + 1).map((element, i)=> { 
            return(
              <img 
                src={element.src} 
                alt="" 
                key={i} 
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









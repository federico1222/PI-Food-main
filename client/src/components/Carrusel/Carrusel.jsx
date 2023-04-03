import { useState, useEffect, useRef } from "react";
import styles from "./Carrusel.module.css";
import diets from "./img";
import { Link } from "react-router-dom";

const Carrusel = () => {
  const carruselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const carrusel = carruselRef.current;
    let interval = null;
    let step = 1;

    const start = () => {
      interval = setInterval(() => {
        carrusel.scrollLeft += step;
        if (
          carrusel.scrollLeft >=
          carrusel.scrollWidth - carrusel.clientWidth
        ) {
          carrusel.scrollLeft = 0;
        }
      }, 30);
    };

    const stop = () => {
      clearInterval(interval);
    };

    if (!isPaused) {
      start();
    }

    return () => {
      stop();
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  return (
    <div
      className={styles.carruselItems}
      ref={carruselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {diets.map((element, i) => (
        <Link key={i} to={'/Diets'}>
        <div key={i} className={styles.carruselItem}>
          <img className={styles.img} src={element.src} alt="" />
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Carrusel;

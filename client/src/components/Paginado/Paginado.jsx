import React from "react";
import styles from '../Paginado/Paginado.module.css'

const Paginado = ({ recipesPerPage, allRecipes, paginado }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    //recorro un arreglo donde tomo el numero
    // redondo que resulta de dividir todos los personajes por pagina que quiero
    pageNumber.push(i);
  }
  return (
    <nav className={styles.containerPaginado}>
      <ul>
        {pageNumber &&
          pageNumber.map((number, i) => {
            return (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <button key={i} className={styles.buttonPaginado}><a onClick={() => paginado(number)}>{number}</a></button>
            );
          })}
      </ul>
    </nav>
  );
};

export default Paginado;

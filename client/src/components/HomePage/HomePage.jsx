import React, { useState, useEffect } from "react";
import styles from "../HomePage/HomePage.module.css";
import Navbar from "../NavBar/NavBar";
import Profile from "../Profile/Profile";
import Carrusel from "../Carrusel/Carrusel";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  filterRecipesDataBase,
  orderByTitle,
  orderByHealthScore,
  orderByDiets,
} from "../../redux/actions";
import Recipes from "../Recipes/Recipes";
import Paginado from "../Paginado/Paginado";
import SearchBar from '../SearchBar/SearchBar'
import publicidad1 from "../../assets/detailimg.png";
import publicidad2 from "../../assets/detailimg1.png";

const HomePage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes); //todas las recetas
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  //------------------------------spinner------------------------------\\
  const [loading, setLoading] = useState(true);
  //------------------------------paginado------------------------------\\
  const [currentPage, setCurrentPage] = useState(1); //paginas
  const [recipesPerPage] = useState(9); //numero de recetas por pagina
  const indexOfLastRecipes = currentPage * recipesPerPage; //ultima reseta
  const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage; //primer reseta
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipes,
    indexOfLastRecipes
  );
  //------------------------------Search------------------------------\\
  const [searchTerm, setSearchTerm] = useState("");
  //------------------------------paginado------------------------------\\
  const paginado = (pageNumbre) => {
    setCurrentPage(pageNumbre);
  };
  //------------------------------DetailRecipe------------------------------\\
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };
  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null);
  };
  //------------------------------filtros------------------------------\\
  const filterDataBase = (e) => {
    dispatch(filterRecipesDataBase(e.target.value));
  };
  const filterByTitle = (e) => {
    e.preventDefault(e);
    dispatch(orderByTitle(e.target.value));
  };
  const filterByHealthScore = (e) => {
    dispatch(orderByHealthScore(e.target.value));
  };
  const filterByDiets = (e) => {
    dispatch(orderByDiets(e.target.value));
  };
  //------------------------------Effects------------------------------\\
  useEffect(() => {
    setLoading(true);
    dispatch(getRecipes()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className={styles.containerHome}>
      <Navbar />
      <div className={styles.home}>
        <div className={styles.welcome}>
          <Profile />
        </div>
        <div className={styles.publicidad}>
          <Link to={'/Favorite'}>
            {" "}
            <img src={publicidad1} alt="" />
          </Link>
          <Link to={'/FormPage'}>
            {" "}
            <img src={publicidad2} alt="" />{" "}
          </Link>
        </div>
        <div className={styles.containerDiets}>
          <h2>Diets</h2>
          <div className={styles.diets}>
            <Carrusel />
          </div>
        </div>
        <div className={styles.containerDiets}>
          <h2>Explore Our Recipes</h2>
          <div className={styles.filters}>
            <select onChange={(e) => filterByTitle(e)}>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <select
              name="health-score"
              onChange={(e) => filterByHealthScore(e)}
            >
              <option value="ceroCien">0-100</option>
              <option value="cienCero">100-0</option>
            </select>
            <select onChange={(e) => filterDataBase(e)}>
              <option value="allRecipes">All Recipes</option>
              <option value="created">My Recipes</option>
            </select>
            <select onChange={(e) => filterByDiets(e)}>
              <option value="gluten free">Gluten Free</option>
              <option value="dairy free">dairy free</option>
              <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="paleolithic">Paleo</option>
              <option value="primal">Primal</option>
              <option value="whole 30">Whole 30</option>
              <option value="pescatarian">Pescetarian</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="fodmap friendly">Low FoodMap</option>
              <option value="allRecipes">All Recipes</option>
            </select>
            <SearchBar/>
            {/* <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /> */}
          </div>
          <div>
            {loading ? (
              <div className={styles.containerSpinner}>
                <div className={styles.spinner}></div>
              </div>
            ) : (
              currentRecipes
                .filter((recipe) =>
                  recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((recipe, i) => {
                  return (
                    <div
                      className={styles.recipes}
                      onClick={() => handleRecipeClick(recipe)}
                      key={i}
                    >
                      <Recipes title={recipe.title} />
                    </div>
                  );
                })
            )}
          </div>
          <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
          />
        </div>
      </div>
      {selectedRecipe && (
        <div className={styles.selectedRecipeContainer}>
          <div className={styles.selectedRecipeContainerInfo}>
            <img src={selectedRecipe.Imagen} alt="" />
            {selectedRecipe.veryPopular === true ? (
              <p className={styles.star}>★★★★★</p>
            ) : (
              <p className={styles.star}>★★</p>
            )}
            <h1>{selectedRecipe.title}</h1>
            <div className={styles.diets1}>
              {selectedRecipe.Diets?.map((diet, i) => {
                return <p key={i}>{diet.name ? diet.name : diet}</p>;
              })}
            </div>
            <div className={styles.buttons}>
              <button onClick={handleCloseRecipeDetails}>Close</button>
              <Link to={`/DetailPage/${selectedRecipe.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

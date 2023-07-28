import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import { fetchPokemons } from "../../Redux/Actions"; // Asegúrate de importar la acción correctamente

import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);


  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  console.log(pokemons)
  return (
    <div>
      <div className="Nav">
        <Link to="/" className="HomeButton">
          <button className="Inicio">Inicio</button>
        </Link>
        <div className="FilterBar">Barras de filtros</div>
        <div className="SortBar">Barras de ordenado</div>
        <input type="text" placeholder="Buscar" className="SearchBar" />
        <Link to="/pokemons/create" className="CreateButton">
          <button>Crear Pokemon</button>
        </Link>
      </div>
      <div className="ContentContainer">
        {pokemons.length > 0 ? (
          <Cards pokemonData={pokemons} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}


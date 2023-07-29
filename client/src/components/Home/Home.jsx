import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import { fetchPokemons, orderCards } from "../../Redux/Actions";
import SearchBar from "../Search/SearchBar";
import Select from 'react-select'
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const handleOrder = (option) => {
    const finalOrder = option.value;
    dispatch(orderCards(finalOrder));
    setSortOrder(finalOrder);
  };

  const sortOptions = [
    { value: "asc", label: "Ascending" },
    { value: "des", label: "Descending" },
  ];

  return (
    <div>
      <div className="Nav">
        <Link to="/" className="HomeButton">
          <button className="Inicio">Inicio</button>
        </Link>
        <div className="FilterBar">
          <Select
            options={sortOptions}
            value={{
              value: sortOrder,
              label: sortOrder === "asc" ? "Ascending" : "Descending",
            }}
            onChange={handleOrder}
          />
        </div>
        <div className="SortBar">Barras de ordenado</div>
        <SearchBar />
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

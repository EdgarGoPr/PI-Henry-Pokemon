import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SearchBar.css'
export default function SearchBar() {
  const [pokemonName, setPokemonName] = useState("");
  const navigate = useNavigate();

  const searchPokemon = async () => {
    const response = await axios.get(
      `http://localhost:3001/pokemons?name=${pokemonName}`
    );
    const pokemon = response.data;
    const id = pokemon.id;
    navigate(`detail/${id}`);
  };

  const handleChange = (event) => {
    setPokemonName(event.target.value.toLowerCase());
  };

  return (
      <div className="search">
        <input
          className="inputSearch"
          placeholder="Search"
          type="search"
          value={pokemonName}
          onChange={handleChange}
        />
        <button className="searchButton" type="button" onClick={searchPokemon}>
        </button>
      </div>
  );
}

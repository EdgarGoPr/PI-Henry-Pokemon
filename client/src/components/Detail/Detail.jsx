// Detail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";
import { Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState();

  useEffect(() => {
    const getPokemonDetail = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/pokemons/detail/${id}`
        );
        setPokemonDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPokemonDetail(id);
  }, [id]);

  return (
    <div className="Detail">
      <div>
        <Link to="/pokemons">
          <button>HOME</button>
        </Link>
      </div>
      {pokemonDetail ? (
        <div>
          <div className="DetailCard">
            <h2>ID: {pokemonDetail.id}</h2>
            <img src={pokemonDetail.image} alt={pokemonDetail.name} />
            <h2>NAME: {pokemonDetail.name}</h2>
            <div className="properties">
              <div className="properties-left">
                <h3>HP: {pokemonDetail.health} pts</h3>
                <h3>ATK: {pokemonDetail.attack} pts</h3>
                <h3>DFS: {pokemonDetail.defense} pts</h3>
              </div>
              <div className="properties-right">
                <h3>SPD: {pokemonDetail.speed} pts</h3>
                <h3>HGT: {pokemonDetail.height} pts</h3>
                <h3>WGT: {pokemonDetail.weight} pts</h3>
              </div>
            </div>
            <h3 className="type">
              TYPE: {pokemonDetail.type[0]}, {pokemonDetail.type[1]}
            </h3>
          </div>
        </div>
      ) : (
        <img src="./detective_dancing.gif" alt="Loading..." />
      )}
    </div>
  );
}

import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Detail.css";
import {
  deletePokemon,
  fetchPokemons,
  getPokemonDetail,
} from "../../Redux/Actions";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    dispatch(getPokemonDetail(id));
  }, [dispatch, id]);

  console.log("pokemonDetail", pokemonDetail);

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Pokémon?"
    );
    if (confirmed) {
      dispatch(deletePokemon(id));
      dispatch(fetchPokemons());
      alert("Pokemon deleted successfully");
      navigate("/pokemons");
    }
  };

  const handleEdit = () => {
    navigate(`/pokemons/edit/${id}`);
  };

  return (
    <div className="Detail">
      <div>
        <Link to="/pokemons">
          <button className="LinkHome">HOME</button>
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
              TYPE: {pokemonDetail.type[0]}{" "}
              {pokemonDetail.type[1] && `, ${pokemonDetail.type[1]}`}
            </h3>
          </div>
        </div>
      ) : (
        <img src="./detective_dancing.gif" alt="Loading..." />
      )}
      <div className="DeleteDiv">
        {pokemonDetail?.source === "DB" && (
          <button onClick={handleEdit} className="DeleteButton">
            Edit Pokemon
          </button>
        )}
      </div>
      <div className="DeleteDiv">
        {pokemonDetail?.source === "DB" && (
          <button onClick={handleDelete} className="DeleteButton">
            Delete Pokemon
          </button>
        )}
      </div>
    </div>
  );
}

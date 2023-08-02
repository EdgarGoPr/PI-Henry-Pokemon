import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchPokemons,
  getTypes,
  change,
  getPokemonDetail,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import validations from "./Validations";
import "./FormEdit.css";

const TypeButton = ({ type, formType, handleTypeClick }) => {
  const isActive = formType.includes(type);

  return (
    <div>
      <button
        className={`selectButton roundButton ${isActive ? "active" : ""}`}
        onClick={() => handleTypeClick(type)}
      ></button>
      <h4>{type}</h4>
    </div>
  );
};

const useNameExists = (name) => {
  const pokemons = useSelector((state) => state.pokemons);
  return pokemons.some(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
  );
};

export default function FormEdit() {
  const { id } = useParams();
  const [error, setError] = useState({});
  const types = useSelector((state) => state.types);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemonDetail(id));
  }, [dispatch]);

  useEffect(() => {
    setForm({
      name: pokemonDetail?.name || "",
      image: pokemonDetail?.image || "",
      life: pokemonDetail?.life || "",
      attack: pokemonDetail?.attack || "",
      defense: pokemonDetail?.defense || "",
      speed: pokemonDetail?.speed || "",
      height: pokemonDetail?.height || "",
      weight: pokemonDetail?.weight || "",
      type: pokemonDetail?.type || [],
    });
  }, [pokemonDetail]);

  const [form, setForm] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: [],
  });

  const nameExists = useNameExists(form.name);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setError(
      validations({
        ...form,
        [name]: value,
      })
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (nameExists) {
      setError((prevError) => ({
        ...prevError,
        name: "Pokemon name already exists!",
      }));
      alert("Pokemon name already exists!");
    } else {
      const updatedPokemon = {
        name: form.name.toLowerCase(),
        image: form.image,
        life: form.life,
        attack: form.attack,
        defense: form.defense,
        speed: form.speed,
        height: form.height,
        weight: form.weight,
        type: form.type,
      };
      const confirmed = window.confirm(
        "Are you sure you want to edit a new Pokémon?"
      );
      if (confirmed) {
        alert(
          `Your pokemon has evolved to ${updatedPokemon.name} with new stats!`
        );
        console.log("updatedPokemon", updatedPokemon);
        dispatch(change(id, updatedPokemon));
        dispatch(fetchPokemons());
        navigate(`/pokemons/detail/${id}`);
      }
    }
  };

  const handleTypeClick = (type) => {
    if (form.type.includes(type)) {
      setForm((prevForm) => ({
        ...prevForm,
        type: prevForm.type.filter((t) => t !== type),
      }));
    } else {
      if (form.type.length >= 2) {
        setError((prevError) => ({
          ...prevError,
          type: "Can not select more than two types",
        }));
      }

      setForm((prevForm) => ({
        ...prevForm,
        type: [...prevForm.type, type],
      }));
    }

    if (error.type && form.type.length < 3) {
      setError((prevError) => ({
        ...prevError,
        type: "",
      }));
    }
  };

  return (
    <div className="form-container">
      <div className="top-left">
        <Link to={`/pokemons/detail/${id}`}>
          <button className="homeButton">Go Back</button>
        </Link>
      </div>
      <form onSubmit={submitHandler}>
        <div className="inputs-container">
          <div className="inputs">
            <div className="input-container">
              <input
                type="text"
                name="name"
                placeholder={`NAME`}
                onChange={changeHandler}
              />
              {error.name && <p className="error-message">{error.name}</p>}
            </div>
            <div className="input-container">
              <input
                type="text"
                name="image"
                placeholder={`IMAGE URL`}
                onChange={changeHandler}
              />
              {error.image && <p className="error-message">{error.image}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="life"
                placeholder={`HEALTH`}
                onChange={changeHandler}
              />
              {error.life && <p className="error-message">{error.life}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="attack"
                placeholder={`ATTACK`}
                onChange={changeHandler}
              />
              {error.attack && <p className="error-message">{error.attack}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="defense"
                placeholder={`DEFENSE`}
                onChange={changeHandler}
              />
              {error.defense && (
                <p className="error-message">{error.defense}</p>
              )}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="speed"
                placeholder={`SPEED`}
                onChange={changeHandler}
              />
              {error.speed && <p className="error-message">{error.speed}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="height"
                placeholder={`HEIGHT`}
                onChange={changeHandler}
              />
              {error.height && <p className="error-message">{error.height}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="weight"
                placeholder={`WEIGHT`}
                onChange={changeHandler}
              />
              {error.weight && <p className="error-message">{error.weight}</p>}
            </div>
          </div>
        </div>
        <div>
          <div className="buttons-container">
            <div className="types-container">
              <h1 className="Type">TYPE</h1>
              <div className="buttons">
                {types &&
                  types.map((type) => (
                    <TypeButton
                      key={uuidv4()}
                      type={type}
                      formType={form.type}
                      handleTypeClick={handleTypeClick}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="ErrorDiv">
            {error.type && <p className="error-message-types">{error.type}</p>}
          </div>
          <button type="submit" className="create-button">
            Edit Pokemon
          </button>
        </div>
      </form>
    </div>
  );
}

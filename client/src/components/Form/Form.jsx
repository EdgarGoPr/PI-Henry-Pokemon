import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchPokemons, getTypes, create } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import validations from "./Validations";
import "./Form.css";

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

export default function Form() {
  const [error, setError] = useState({});
  const types = useSelector((state) => state.types);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

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
    const errors = validations(form);

    if (Object.keys(errors).length === 0) {
      if (nameExists) {
        setError((prevError) => ({
          ...prevError,
          name: "Pokemon name already exists!",
        }));
        alert("Pokemon name already exists!");
      } else {
        const newPokemon = {
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
        alert(`There's a new pokemon in town, welcome ${newPokemon.name}`);
        dispatch(create(newPokemon));
        dispatch(fetchPokemons());
        navigate("/pokemons");
      }
    } else {
      alert("Could not create pokemon, missing data");
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
        return;
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
        <Link to="/pokemons">
          <button>Home</button>
        </Link>
      </div>
      <form onSubmit={submitHandler}>
        <div className="inputs-container">
          <div className="inputs">
            <div className="input-container">
              <input
                type="text"
                name="name"
                placeholder="NAME"
                value={form.name}
                onChange={changeHandler}
              />
              {error.name && <p className="error-message">{error.name}</p>}
            </div>
            <div className="input-container">
              <input
                type="text"
                name="image"
                placeholder="IMAGE URL"
                value={form.image}
                onChange={changeHandler}
              />
              {error.image && <p className="error-message">{error.image}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="life"
                placeholder="HEALTH"
                value={form.life}
                onChange={changeHandler}
              />
              {error.life && <p className="error-message">{error.life}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="attack"
                placeholder="ATTACK"
                value={form.attack}
                onChange={changeHandler}
              />
              {error.attack && <p className="error-message">{error.attack}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="defense"
                placeholder="DEFENSE"
                value={form.defense}
                onChange={changeHandler}
              />
              {error.defense && <p className="error-message">{error.defense}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="speed"
                placeholder="SPEED"
                value={form.speed}
                onChange={changeHandler}
              />
              {error.speed && <p className="error-message">{error.speed}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="height"
                placeholder="HEIGHT"
                value={form.height}
                onChange={changeHandler}
              />
              {error.height && <p className="error-message">{error.height}</p>}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="weight"
                placeholder="WEIGHT"
                value={form.weight}
                onChange={changeHandler}
              />
              {error.weight && <p className="error-message">{error.weight}</p>}
            </div>
          </div>
        </div>
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
            <div> {error.type && <p className="error-message-types">{error.type}</p>} </div>
          </div>
        </div>
        <div></div>
        <button type="submit" className="create-button">
          Create Pokemons
        </button>
      </form>
    </div>
  );
}

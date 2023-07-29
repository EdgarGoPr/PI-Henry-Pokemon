// import React from "react";
// import { Link } from "react-router-dom";
// import "./Form.css";

// export default function Form() {
//   return (
//     <div className="form-container">
//       <div className="top-left">
//         <Link to="/pokemons">
//           <button>Home</button>
//         </Link>
//       </div>
//       <div className="inputs-container">
//         <div className="inputs">
//           <input type="text" placeholder="NAME" />
//           <input type="number" placeholder="HEALTH" />
//           <input type="number" placeholder="ATTACK" />
//           <input type="number" placeholder="DEFENSE" />
//           <input type="number" placeholder="SPEED" />
//           <input type="number" placeholder="HEIGHT" />
//           <input type="number" placeholder="WEIGHT" />
//         </div>
//       </div>
//       <div className="buttons-container">
//         <div className="types-container">
//           <h1>TYPE</h1>
//           <div className="buttons">
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 1</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 2</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 3</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 4</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 5</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 6</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 7</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 8</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 9</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 10</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 11</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 12</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 13</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 14</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 15</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 16</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 17</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 18</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 19</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 20</h4>
//             </div>
//           </div>
//         </div>
//         <button className="create-button">Create Pokemons</button>
//       </div>
//     </div>
//   );
// }

//----------------------------------------------------------------------------

// const TypeButton = ({ type, formType, handleTypeClick }) => {
//   const isActive = formType.includes(type);

//   return (
//     <div>
//       <button
//         className={`selectButton roundButton ${isActive ? "active" : ""}`}
//         onClick={() => handleTypeClick(type)}
//       ></button>
//       <h4>{type}</h4>
//     </div>
//   );
// };

// export default function Form() {
//   const [typesDef, setTypesDef] = useState([]);
//   const [error, setError] = useState({});
//   const types = useSelector((state) => state.type);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getTypes());
//   }, [dispatch]);

//   const [form, setForm] = useState({
//     name: "",
//     image: "",
//     health: "",
//     attack: "",
//     defense: "",
//     speed: "",
//     height: "",
//     weight: "",
//     type: [],
//   });

//   const changeHandler = (event) => {
//     const { name, value } = event.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     const newPokemon = {
//       name: form.name,
//       image: form.image,
//       health: form.health,
//       attack: form.attack,
//       defense: form.defense,
//       speed: form.speed,
//       height: form.height,
//       weight: form.weight,
//       type: form.type,
//     };
//     dispatch(create(newPokemon));
//     dispatch(fetchPokemons());
//     navigate("/home");
//   };

//   const handleTypeClick = (type) => {
//     if (types && Array.isArray(types) && types.includes(type)) {
//       setTypesDef(types.filter((t) => t !== type));
//     } else {
//       setForm((prevForm) => ({
//         ...prevForm,
//         type: [...prevForm.type, type],
//       }));
//     }
//   };

//   return (
//     <div className="form-container">
//       <div className="top-left">
//         <Link to="/pokemons">
//           <button>Home</button>
//         </Link>
//       </div>
//       <form onSubmit={submitHandler}>
//         <div className="inputs-container">
//           <div className="inputs">
//             <input
//               type="text"
//               name="name"
//               placeholder="NAME"
//               value={form.name}
//               onChange={changeHandler}
//             />
//             <input
//               type="text"
//               name="image"
//               placeholder="IMAGE URL"
//               value={form.image}
//               onChange={changeHandler}
//             />
//             <input
//               type="number"
//               name="health"
//               placeholder="HEALTH"
//               value={form.health}
//               onChange={changeHandler}
//             />
//             <input
//               type="number"
//               name="attack"
//               placeholder="ATTACK"
//               value={form.attack}
//               onChange={changeHandler}
//             />
//             <input
//               type="number"
//               name="defense"
//               placeholder="DEFENSE"
//               value={form.defense}
//               onChange={changeHandler}
//             />
//             <input
//               type="number"
//               name="speed"
//               placeholder="SPEED"
//               value={form.speed}
//               onChange={changeHandler}
//             />
//             <input
//               type="number"
//               name="height"
//               placeholder="HEIGHT"
//               value={form.height}
//               onChange={changeHandler}
//             />
//             <input
//               type="number"
//               name="weight"
//               placeholder="WEIGHT"
//               value={form.weight}
//               onChange={changeHandler}
//             />
//           </div>
//         </div>
//       </form>
//       <div className="buttons-container">
//         <div className="types-container">
//           <h1>TYPE</h1>
//           <div className="buttons">
//             {/* <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 1") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 1")}
//               ></button>
//               <h4>Type 1</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 2") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 2")}
//               ></button>
//               <h4>Type 2</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 3") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 3")}
//               ></button>
//               <h4>Type 3</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 4") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 4")}
//               ></button>
//               <h4>Type 4</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 5") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 5")}
//               ></button>
//               <h4>Type 5</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 6") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 6")}
//               ></button>
//               <h4>Type 6</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 7") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 7")}
//               ></button>
//               <h4>Type 7</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 8") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 8")}
//               ></button>
//               <h4>Type 8</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 9") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 9")}
//               ></button>
//               <h4>Type 9</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 10") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 10")}
//               ></button>
//               <h4>Type 10</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 11") ? "active" : "" */}
//             {/* }`}
//                 onClick={() => handleTypeClick("Type 11")}
//               ></button>
//               <h4>Type 11</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 12") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 12")}
//               ></button>
//               <h4>Type 12</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 13") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 13")}
//               ></button>
//               <h4>Type 13</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 14") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 14")}
//               ></button>
//               <h4>Type 14</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 15") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 15")}
//               ></button>
//               <h4>Type 15</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 16") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 16")}
//               ></button>
//               <h4>Type 16</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 17") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 17")}
//               ></button>
//               <h4>Type 17</h4> */}
//             {/* </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 18") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 18")}
//               ></button>
//               <h4>Type 18</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 19") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 19")}
//               ></button>
//               <h4>Type 19</h4>
//             </div>
//             <div>
//               <button
//                 className={`selectButton roundButton ${
//                   form.type.includes("Type 20") ? "active" : ""
//                 }`}
//                 onClick={() => handleTypeClick("Type 20")}
//               ></button>
//               <h4>Type 20</h4> */}
//             {/* </div> */}
//             {types &&
//               Array.isArray(types) &&
//               types.map((type) => (
//                 <TypeButton
//                   key={type}
//                   type={type}
//                   formType={form.type}
//                   handleTypeClick={handleTypeClick}
//                 />
//               ))}
//           </div>
//         </div>
//         <button type="submit" className="create-button">
//           Create Pokemons
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchPokemons, getTypes, create } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
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

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
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
    alert(`There´s a new pokemon in town, welcome ${newPokemon.name}`)
    dispatch(create(newPokemon));
    dispatch(fetchPokemons());
    navigate("/pokemons");
  };

  const handleCreateButtonClick = () => {
    navigate("/pokemons");
  };

  const handleTypeClick = (type) => {
    if (form.type.includes(type)) {
      setForm((prevForm) => ({
        ...prevForm,
        type: prevForm.type.filter((t) => t !== type),
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        type: [...prevForm.type, type],
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
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={form.name}
              onChange={changeHandler}
            />
            <input
              type="text"
              name="image"
              placeholder="IMAGE URL"
              value={form.image}
              onChange={changeHandler}
            />
            <input
              type="number"
              name="life"
              placeholder="HEALTH"
              value={form.health}
              onChange={changeHandler}
            />
            <input
              type="number"
              name="attack"
              placeholder="ATTACK"
              value={form.attack}
              onChange={changeHandler}
            />
            <input
              type="number"
              name="defense"
              placeholder="DEFENSE"
              value={form.defense}
              onChange={changeHandler}
            />
            <input
              type="number"
              name="speed"
              placeholder="SPEED"
              value={form.speed}
              onChange={changeHandler}
            />
            <input
              type="number"
              name="height"
              placeholder="HEIGHT"
              value={form.height}
              onChange={changeHandler}
            />
            <input
              type="number"
              name="weight"
              placeholder="WEIGHT"
              value={form.weight}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="buttons-container">
          <div className="types-container">
            <h1>TYPE</h1>
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
        <button type="submit" className="create-button">
          Create Pokemons
        </button>
      </form>
    </div>
  );
}

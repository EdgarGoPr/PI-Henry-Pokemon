import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card(data) {
  // const typeColor = getTypeColor(data.type[0]);

  return (
    <div className="Card" key={data.id}>
      <img className="Card-image" src={data.image} alt={data.name} />
      <h2 className="Card-name">{data.name}</h2>
      <div className="typesContainer">
        <p className={`Card-type-${data.type[0]}`}>{data.type[0]}</p>
        <p className={`Card-type-${data.type[1]}`}>{data.type[1]}</p>
      </div>
      <Link to={`/pokemons/detail/${data.id}`} className="Card-link">
        <button className="Card-button">+</button>
      </Link>
    </div>
  );
}

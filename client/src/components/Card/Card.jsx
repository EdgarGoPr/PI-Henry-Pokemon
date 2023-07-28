import React from "react";
import './Card.css'

export default function Card(data) {
  return (
    <div className="Card" key={data.id}>
      <img src={data.image} alt={data.name} />
      <h2>{data.name}</h2>
      <p>{data.type[0]}</p>
      <p>{data.type[1]}</p>
    </div>
  );
}


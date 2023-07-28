import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className = 'FondoLanding'>
      <Link to="/pokemons">
        <button className="Enter">Enter a new world</button>
      </Link>
    </div>
  );
}

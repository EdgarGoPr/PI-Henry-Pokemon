import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Cards.css';

const Cards = () => {
  const pokemons = useSelector((state) => state.pokemons);

  if (!pokemons) {
    return 'No se pudo cargar los pokemons'
  }

  return (
    <div className='Cartitas'>
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          type={pokemon.type}
        />
      ))}
    </div>
  );
}

export default Cards;




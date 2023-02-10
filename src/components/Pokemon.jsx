import React from 'react';
import { Link } from 'react-router-dom';

const Pokemon = ({ pokemon }) => {
  const pokeIdUrl = pokemon.url;
  const pokeId = pokeIdUrl.split('/');

  return (
    <div>
      <Link to={`/pokemon/${pokeId[6]}`}>
        <h2 className='capitalize'>{pokemon.name}</h2>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId[6]}.png`} alt={pokemon.name} />
      </Link>
    </div>
  );
};

export default Pokemon;

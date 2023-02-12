import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Pokemon = ({ pokemon }) => {
  const pokeIdUrl = pokemon.url;
  const pokeId = pokeIdUrl.split('/');

  return (
    <Link to={`/pokemon/${pokeId[6]}`}>
      <div className='Pokemon box'>
        <h2 className='capitalize'>{pokemon.name}</h2>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId[6]}.png`} alt={pokemon.name} />
        <h4>Ver detalhes</h4>
      </div>
    </Link>
  );
};

export default Pokemon;

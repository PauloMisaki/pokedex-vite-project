import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Pokemon from './Pokemon';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    api.get('/pokemon?limit=151')
      .then(res => {
        setPokemon(res.data.results);
      })
  }, []);

  return (
    <div>
      <h1>Projeto Pokédex</h1>
      <div>
        {pokemon.map(p => (
          <Pokemon key={p.name} pokemon={p} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;

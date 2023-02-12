import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './details.css';

const PokemonDetails = () => {
  const { pokemonId } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    api.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(res => {
        setPokemon(res.data);
        setLoading(false);
      })
  }, [pokemonId]);

  return (
    <div className='PokemonDetails'>
      {loading ? <p>Carregando...</p> : (
        <div>
          <h2 className='capitalize'>{pokemon.name}</h2>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
          <p className='capitalize'>Tipos: {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p className='capitalize'>Habilidades: {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;

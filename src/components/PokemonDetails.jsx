import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

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
    <div className='PokemonDetails-page'>
      {loading ? <p>Loading...</p> : (
        <div className='PkDetails'>
          <div className='PkDetails-header'>
            <h2 className='capitalize'>{pokemon.name}{console.log(pokemon.stats[0])}</h2>
            <h2>#{pokemon.id}</h2>
          </div>
          <div className='PkDetails-image'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
          </div>
          <div className='PkDetails-types'>
            <p className='capitalize'>Types: {pokemon.types.map(t => t.type.name).join(' / ')}</p>
          </div>
          <div className='PkDetails-misc'>
            <p className='capitalize'>Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
            <p className='capitalize'>Weight: {pokemon.weight / 10} KG</p>
            <p className='capitalize'>Heigth: {pokemon.height / 10} M</p>
            <div className='PkDetails-stats'>
              <p>HP: {pokemon.stats[0].base_stat}</p>
              <p>Attack: {pokemon.stats[1].base_stat}</p>
              <p>Defense: {pokemon.stats[2].base_stat}</p>
              <p>Special Attack: {pokemon.stats[3].base_stat}</p>
              <p>Special Defense: {pokemon.stats[4].base_stat}</p>
              <p>Speed: {pokemon.stats[5].base_stat}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;

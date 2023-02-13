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
    <>
      {loading ? <p>Loading...</p> : (
      <div className={`PokemonDetails-page bg-${pokemon.types[0].type.name}`}>
        <div className={`PkDetails gradient`}>
          <div className='PkDetails-header'>
            <h2 className='capitalize'>{pokemon.name}{console.log(pokemon.types[0].type.name)}</h2>
            <h2>#{pokemon.id}</h2>
          </div>
          <div className='PkDetails-image'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
          </div>
          <div className='PkDetails-types'>
            <h4 className={`type-${pokemon.types[0].type.name} uppercase`}>{pokemon.types[0].type.name}</h4>
            {pokemon.types.length > 1 ? (
            <h4 className={`type-${pokemon.types[1].type.name} uppercase`}>{pokemon.types[1].type.name}</h4>
            ) : null}
          </div>
          <div className='PkDetails-misc'>
            <h2 className='PkDetails-misc'>About</h2>
            <div className='misc-info'>
              <div data-testid='pkd-weight' className='ordered-info'>
                <p className='capitalize ordered-info-stat'>{pokemon.weight / 10} KG</p>
                <p>Weight</p>
              </div>
              <div data-testid='pkd-abilities' className='ordered-info'>
                <p className='capitalize ordered-info-stat'>{pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                <p>Abilities</p>
              </div>
              <div data-testid='pkd-height' className='ordered-info'>
                <p className='capitalize ordered-info-stat'>{pokemon.height / 10} M</p>
                <p>Height</p>
              </div>
            </div>
            <div data-testid='pkd-stats' className='PkDetails-stats'>
              <p className='stat'>HP: <span className='ordered-info-stat'>{pokemon.stats[0].base_stat}</span></p>
              <p className='stat'>Attack: <span className='ordered-info-stat'>{pokemon.stats[1].base_stat}</span></p>
              <p className='stat'>Defense: <span className='ordered-info-stat'>{pokemon.stats[2].base_stat}</span></p>
              <p className='stat'>Sp. Attack: <span className='ordered-info-stat'>{pokemon.stats[3].base_stat}</span></p>
              <p className='stat'>Sp. Defense: <span className='ordered-info-stat'>{pokemon.stats[4].base_stat}</span></p>
              <p className='stat'>Speed: <span className='ordered-info-stat'>{pokemon.stats[5].base_stat}</span></p>
            </div>
          </div>
        </div>
    </div>
      )}
    </>
  );
};

export default PokemonDetails;

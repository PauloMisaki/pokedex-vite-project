import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './styles.css';

const Pokemon = ({ pokemon }) => {
  const [pokeInfo, setPokeInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const pokeIdUrl = pokemon.url;
  const pokeId = pokeIdUrl.split('/');

  useEffect(() => {
    api.get(`/pokemon/${pokeId[6]}`).then(res => {
      setPokeInfo(res.data);
      setLoading(true);
    })
  }, [])

  return (
    <>
      {loading && 
        <Link to={`/pokemon/${pokeId[6]}`}>
          <div className={`Pokemon ${pokeInfo.types[0].type.name}`}>
            <h3 className='capitalize'>{pokemon.name}</h3>
            <h6>{`#${pokeId[6]}`}</h6>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId[6]}.png`} alt={pokemon.name} />
            <h4 className={`capitalize type-${pokeInfo.types[0].type.name}`}>{pokeInfo.types.map(t => t.type.name).join(' / ')}</h4>
          </div>
        </Link>
      }
    </>
    
  );
};

export default Pokemon;

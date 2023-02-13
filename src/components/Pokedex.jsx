import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from './Header';
import Pokemon from './Pokemon';
import './styles.css';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigateTo = useNavigate();

  useEffect(() => {
    api.get('/pokemon?limit=151')
      .then(res => {
        setPokemon(res.data.results);
      })
  }, []);

  const generations = [
    { name: 'Kanto', value: 1 },
    { name: 'Johto', value: 2 },
    { name: 'Hoenn', value: 3 },
    { name: 'Sinnoh', value: 4 },
    { name: 'Unova', value: 5 },
    { name: 'Kalos', value: 6 },
    { name: 'Alola', value: 7 },
    { name: 'Galar', value: 8 },
    { name: 'Paldea', value: 9 },
  ]

  const handleGeneration = async (e) => {
    await api.get(`/generation/${e.target.value}`)
      .then(res => {
        setPokemon(res.data.pokemon_species);
      })
  }

  const handleQuery = (e) => {
    setQuery(e.target.value);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) {
      setError('It is not possible to choose a Pokémon without its species name or ID!')
    } else {
      setError('');
      try {
        await api.get(`/pokemon/${query.toLowerCase()}`);
        navigateTo(`/pokemon/${query.toLowerCase()}`)
      } catch (error) {
        setError('Error "catching" the pokémon (check name or ID)');
      }
    }
  }

  return (
    <div>
      <Header/>
      <h5>Filter by region or choose any Pokémon below with name or NationalDex number</h5>
      <div className='filter-div'>
        <form onSubmit={handleSearch} className='filter-form'>
          <input 
            data-testid='query-input'
            className='search-input'
            type="text" 
            placeholder="Find by name or ID"
            value={query} 
            onChange={handleQuery} 
          />
          <button data-testid='search-button' type="submit" className='search-button'>I choose you!</button>
          {error && 
            <h3>{error}</h3>
          }
        </form>
        <label htmlFor="gen" className='select'>Regions
          <div className='select'>
            <select data-testid='region-select' className='gen-select' name="generation" id="gen" onChange={handleGeneration}>
              {generations.map(generation => (
                <option data-testid={generation.name} key={generation.name} value={generation.value}>{generation.name}</option>
              ))}
            </select>
          </div>
        </label>
      </div>
      <div>
        {pokemon.sort((a, b) => a.url.split('/')[6] - b.url.split('/')[6]).map(p => (
          <Pokemon key={p.name} pokemon={p} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;

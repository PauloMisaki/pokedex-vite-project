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

  const handleGeneration = async (e) => {
    console.log(e.target.value);
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
        const response = await api.get(`/pokemon/${query.toLowerCase()}`);
        console.log(response);
        navigateTo(`/pokemon/${query.toLowerCase()}`)
      } catch (error) {
        setError('Error catching the pokémon (check name or ID)');
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
            className='search-input'
            type="text" 
            placeholder="Find by name or ID"
            value={query} 
            onChange={handleQuery} 
          />
          <button type="submit" className='search-button'>I choose you!</button>
          {error && 
            <h3>{error}</h3>
          }
        </form>
        <label htmlFor="gen" className='select'>Regions
          <div className='select'>
            <select className='gen-select' name="generation" id="gen" onChange={handleGeneration}>
              <option value="1">Kanto</option>
              <option value="2">Johto</option>
              <option value="3">Hoenn</option>
              <option value="4">Sinnoh</option>
              <option value="5">Unova</option>
              <option value="6">Kalos</option>
              <option value="7">Alola</option>
              <option value="8">Galar</option>
              <option value="9">Paldea</option>
            </select>
          </div>
        </label>
      </div>
      <div>
        {pokemon.map(p => (
          <Pokemon key={p.name} pokemon={p} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;

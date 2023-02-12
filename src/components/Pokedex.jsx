import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Pokemon from './Pokemon';

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
      setError('Não é possivel buscar sem um nome ou ID!')
    } else {
      setError('');
      try {
        const response = await api.get(`/pokemon/${query.toLowerCase()}`);
        console.log(response);
        navigateTo(`/pokemon/${query.toLowerCase()}`)
      } catch (error) {
        setError('Houve um erro ao buscar o pokémon (verifique a ortografia do nome ou o ID)');
      }
    }
  }

  return (
    <div>
      <h1>Projeto Pokédex</h1>
      <h4>Clique em qualquer Pokémon da lista para ser redirecionado para sua página de detalhes
        <br/>Você pode também digitar qualquer nome ou id válidos e buscar um Pokémon específico
        <br/>Tente também filtrar a lista de pokémons por gerações!
        </h4>
      <div>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Busque pelo nome ou ID"
            value={query} 
            onChange={handleQuery} 
          />
          <button type="submit">Buscar</button>
          {error && 
            <h3>{error}</h3>
          }
        </form>
        <button value='1' onClick={handleGeneration}>Kanto</button>
        <button value='2' onClick={handleGeneration}>Johto</button>
        <button value='3' onClick={handleGeneration}>Hoenn</button>
        <button value='4' onClick={handleGeneration}>Sinnoh</button>
        <button value='5' onClick={handleGeneration}>Unova</button>
        <button value='6' onClick={handleGeneration}>Kalos</button>
        <button value='7' onClick={handleGeneration}>Alola</button>
        <button value='8' onClick={handleGeneration}>Galar</button>
        <button value='9' onClick={handleGeneration}>Paldea</button>
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

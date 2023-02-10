import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Pokedex/> } />
        <Route exact path="/pokemon/:pokemonId" element={ <PokemonDetails/> } />
      </Routes>
    </Router>
  );
}

export default App;
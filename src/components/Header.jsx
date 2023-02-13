import React from 'react'
import pokeBall from '../assets/pokeball.svg'
import './styles.css';

export default function Header() {
  return (
    <div className='header'>
      <img src={pokeBall} alt="Pokeball Logo" className='logo'/>
      <h1 className='header-text'>POKÉDEX</h1>
    </div>
  )
}

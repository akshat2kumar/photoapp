import React from 'react'
import iconimg from './icons8-prequel-app-100.png'
import './Navbar.scss'

export default function Navbar() {
  return (
    <div className='navbar'>
       <div className='icondiv'>
        <h3 className='photo'>Photo</h3>
        <img src={iconimg} className='iconimg' alt='asddf'></img>
        <h3 className='app'>App</h3>
       </div>
    </div>
  )
}

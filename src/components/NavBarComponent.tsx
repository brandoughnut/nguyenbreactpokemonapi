import React from 'react'
import '../App.css';
import random from '../assets/pokemonrandom.png';
import search from '../assets/pokemonsearch.png';

const NavBarComponent = () => {
  return (
    <div>

    <div className="flex justify-center xl:justify-between h-[97px] canvasBG">
      <div className="text-[60px] hidden xl:block judsonBold">Pokedex</div>

      <div className="flex items-center">
        <div className="hidden sm:block">
            <button className="bg-[#F78484] w-[70px] h-[61px] flex items-center justify-center rounded-2xl">
                <img src={random} alt="shuffle icon" />
            </button> 
        </div>
        

        <div className="mx-5">
            <input className="h-[50px] w-[275px] sm:h-[61px] sm:w-[379px] rounded-xl focus:outline-none focus:ring-0 text-xl sm:text-2xl placeholder:text-black juraRegular" type="text" placeholder="Search for a Pokemon"/>
        </div>
        

        <button className="bg-[#F78484] w-[57px] h-[50px] sm:w-[70px] sm:h-[61px] flex items-center justify-center rounded-xl sm:rounded-2xl">
          <img src={search} alt="search icon" />
        </button>
      </div>
      
    </div>
<div className="flex justify-center">
        <div className="block sm:hidden">
            <button className="bg-[#F89494] h-[46px] w-[354px] rounded-xl text-white text-[20px] mb-7 ms-4 juraBold">
                Randomize
            </button>
      </div>
      </div>
      </div>
  )
}

export default NavBarComponent

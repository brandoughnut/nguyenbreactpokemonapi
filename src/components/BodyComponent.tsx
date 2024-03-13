import React, { useEffect, useState } from 'react'
import { LocationAPISearch, getPokemon } from '../DataServices/DataServices'
import favoriteIcon from '../assets/pokemonfavorite.png';
import random from '../assets/pokemonrandom.png';
import search from '../assets/pokemonsearch.png';
import '../App.css';

const BodyComponent = () => {
    interface IPokemonType {
        slot:number
        type:IType
    }
    
    interface IType {
        name:string
        url:string
    }

    interface IPokemonMove {
        move:IMove
        version_group_details:[]
    }

    interface IMove {
        name:string
        url:string
    }

    interface IPokemonAbilities {
        ability:IAbilities
    }

    interface IAbilities {
        name:string
        url:string
    }

    const [pokemonName, setPokemonName] = useState<string>('');
    const [pokemonID, setPokemonID] = useState<string>('');
    const [pokemonType, setPokemonType] = useState<IPokemonType[]>([]);
    const [pokemonImage, setPokemonImage] = useState<string>('');
    const [pokemonLocation, setPokemonLocation] = useState<string>('');
    const [pokemonMoves, setPokemonMoves] = useState<IPokemonMove[]>([]);
    const [pokemonAbilities, setPokemonAbilities] = useState<IPokemonAbilities[]>([]);

    useEffect(() => {
        const getPokemonData = async () => {
            const pokemonData = await getPokemon('dialga');
            console.log(pokemonData);
            console.log(pokemonData.abilities);
            setPokemonType(pokemonData.types);
            setPokemonName(pokemonData.name[0].toUpperCase()+pokemonData.name.substring(1));
            setPokemonID(pokemonData.id);
            setPokemonImage(pokemonData.sprites.other["official-artwork"].front_default);
            setPokemonMoves(pokemonData.moves);
            setPokemonAbilities(pokemonData.abilities);
        }

        const getPokemonLocation = async () => {
            const pokemonLocation = await LocationAPISearch('dialga');
            if(pokemonLocation.length == 0){
                setPokemonLocation('N/A');
            }else{
                setPokemonLocation(pokemonLocation[0].location_area.name.split("-").join(" "));
            }
        }
        getPokemonData();
        getPokemonLocation();
    }, [])

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

        <div className="fire min-h-screen bg-cover pt-[73px]">
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 canvasBG">
        {/* bg-white/75 h-auto xl:h-[617px] rounded-3xl */}
        <div className="bg-white/75 h-auto xl:h-[617px] rounded-3xl">
            <div className="flex justify-center mt-10 leftMargin">
                <div className="bg-white/75 rounded-[235px] px-5 py-5">
                    <img className="h-[235px] cursorEffect" src={pokemonImage} alt="charmander"/>
                </div>
                <div>
                    <img className='cursorEffect' src={favoriteIcon} alt="favorite icon"/>
                </div>
                
                
            </div>

            <div className="text-center text-[30px] mt-14 mx-7 juraBold">
                <p>Name: {`${pokemonName} #${pokemonID}`}</p>
                <p>Type: {pokemonType.map((pokemonType, idx) => {
                    return (
                        <>
                           {<span key={idx}>{`${pokemonType.type.name}, `}</span>}
                        </>
                    )
                })}</p>
                
                <p>Location Found: {pokemonLocation}</p>
                <div className="text-center">
                    <button className="text-black bg-white opacity-75 h-[83px] w-[300px] sm:w-[398px] text-[30px] rounded-3xl px-5 py-2.5 mt-[37px] mb-[35px] xl:hidden juraBold" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">
                    Open Favorites
                    </button>
                 </div>
            </div>
        </div>
        <div className="inline-flex flex-col justify-between">
            <div className="bg-white/75 h-[290px] rounded-3xl mb-10">
                <div className="mt-8 marginPosition">
                    <p className="text-[30px] juraBold">Abilities</p>
                    <div className="overflow-y-scroll h-44">
                        <p className="text-[25px] juraRegular">{pokemonAbilities.map((pokemonAbility, idx) => {
                            return(
                                <>
                                {<span key={idx}>{`${pokemonAbility.ability.name}, `}</span>}
                                </>
                            )
                        })}</p>
                    </div>
                    
                </div>
            </div>
            <div className="bg-white/75 h-[290px] rounded-3xl">
                <div className="mt-8 marginPosition">
                    <p className="text-[30px] juraBold">Moves</p>
                    <div className="overflow-y-scroll h-44">
                        <p className="text-[25px] juraRegular">
                            {pokemonMoves.map((pokemonMove, idx) => {
                                return (
                                    <>
                                    {<span key={idx}>{`${pokemonMove.move.name}, `}</span>}
                                    </>
                                )
                        })}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>

    <div className="bg-white/75 h-auto rounded-3xl mt-10 canvasBG">
        <p className="text-[35px] xl:text-[40px] evolutionText">Evolutions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-8 justify-between">
            
        </div>
    </div>


    <div className="hidden xl:block">
        <div className="text-center">
            <button className="text-black bg-white opacity-75 h-[83px] w-[398px] text-[30px] rounded-3xl px-5 py-2.5 mb-[113px] mt-[70px] juraBold" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">
                Open Favorites
            </button>
        </div>
    </div>
        

    </div>

    </div>
  )
}

export default BodyComponent

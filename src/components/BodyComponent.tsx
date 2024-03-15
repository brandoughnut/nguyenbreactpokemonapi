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
    const [pokemonInput, setPokemonInput] = useState<string>('1');
    const [savedInput, setSavedInput] = useState<string>('1');
    const [toggleFavorite, setToggleFavorite] = useState<string>('hidden');
    const [pokemonBG, setPokemonBG] = useState<string>('grass');

    const [reRender, setReRender] = useState<boolean>(true);

    useEffect(() => {
        const getPokemonData = async () => {
            const pokemonData = await getPokemon(savedInput);
            const pokemonLocation = await LocationAPISearch(savedInput);
            console.log(pokemonData);
            setPokemonType(pokemonData.types);
            setPokemonName(pokemonData.name[0].toUpperCase()+pokemonData.name.substring(1));
            setPokemonID(pokemonData.id);
            setPokemonImage(pokemonData.sprites.other["official-artwork"].front_default);
            setPokemonMoves(pokemonData.moves);
            setPokemonAbilities(pokemonData.abilities);
            if(pokemonLocation.length === 0){
                setPokemonLocation('N/A');
            }else{
                setPokemonLocation(pokemonLocation[0].location_area.name.split("-").join(" "));
            }
        }

        const pokemonTypeBG = async () => {
            const pokemonData = await getPokemon(savedInput);
            switch(pokemonData.types[0].type.name){
                case "bug":
                    setPokemonBG('bug');
                    break;
                case "dark":
                    setPokemonBG('dark');
                    break;
                case "dragon":
                    setPokemonBG('dragon');
                    break;
                case "electric":
                    setPokemonBG('electric');
                    break;
                case "fighting":
                    setPokemonBG('fighting');
                    break;
                case "fire":
                    setPokemonBG('fire');
                    break;
                case "flying":
                    setPokemonBG('flying');
                    break;
                case "ghost":
                    setPokemonBG('ghost');
                    break;
                case "grass":
                    setPokemonBG('grass');
                    break;
                case "ground":
                    setPokemonBG('ground');
                    break;
                case "ice":
                    setPokemonBG('ice');
                    break;
                case "normal":
                    setPokemonBG('normal');
                    break;
                case "poison":
                    setPokemonBG('poison');
                    break;
                case "psychic":
                    setPokemonBG('psychic');
                    break;
                case "rock":
                    setPokemonBG('rock');
                    break;
                case "steel":
                    setPokemonBG('steel');
                    break;
                case "water":
                    setPokemonBG('water');
                    break;
                default:
                    setPokemonBG('grass');
            }
        }
        
        getPokemonData();
        pokemonTypeBG();
        setPokemonInput('');
        console.log(savedInput);

    }, [reRender])

    const shinyPokemon = async() => {
        const pokemonData = await getPokemon(savedInput);
        if(pokemonImage === pokemonData.sprites.other["official-artwork"].front_default){
            setPokemonImage(pokemonData.sprites.other["official-artwork"].front_shiny);
        }else{
            setPokemonImage(pokemonData.sprites.other["official-artwork"].front_default);
        }
    }

    const randomPokemon = () => {
        let random:number = Math.floor(Math.random() * 649) + 1;
        setSavedInput(`${random}`);
    }

    const handleFavorites = () => {
        if(toggleFavorite === 'hidden'){
            setToggleFavorite('');
        }else {
            setToggleFavorite('hidden');
        }
    }

    const reRenderPage = () => {
        setReRender(!reRender);
    }

  return (
    <div>
        <div className="flex justify-center xl:justify-between h-[97px] canvasBG">
      <div className="text-[60px] hidden xl:block judsonBold">Pokedex</div>

      <div className="flex items-center">
        <div className="hidden sm:block">
            <button onClick={() => {
                randomPokemon();
                reRenderPage();
            }} className="bg-[#F78484] w-[70px] h-[61px] flex items-center justify-center rounded-2xl">
                <img src={random} alt="shuffle icon" />
            </button> 
        </div>
        

        <div className="mx-5">
            <input onChange={(e)=> setPokemonInput(e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {if((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){
                setPokemonInput((e as React.ChangeEvent<HTMLInputElement>).target.value)
                setSavedInput(pokemonInput)
                reRenderPage();
            }
            }} value={pokemonInput} className="h-[50px] w-[275px] sm:h-[61px] sm:w-[379px] rounded-xl focus:outline-none focus:ring-0 text-xl sm:text-2xl placeholder:text-black juraRegular" type="text" placeholder="Search for a Pokemon"/>
        </div>
        

        <button onClick={() => {
            setSavedInput(pokemonInput);
            reRenderPage();
        }} className="bg-[#F78484] w-[57px] h-[50px] sm:w-[70px] sm:h-[61px] flex items-center justify-center rounded-xl sm:rounded-2xl">
          <img src={search} alt="search icon" />
        </button>
      </div>
      
    </div>
<div className="flex justify-center">
        <div className="block sm:hidden">
            <button onClick={() => {
                randomPokemon();
                reRenderPage();
            }} className="bg-[#F89494] h-[46px] w-[354px] rounded-xl text-white text-[20px] mb-7 ms-4 juraBold">
                Randomize
            </button>
      </div>
      </div>

        <div className={`${pokemonBG} min-h-screen bg-cover pt-[73px]`}>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 canvasBG">
        <div className="bg-white/75 h-auto xl:h-[617px] rounded-3xl">
            <div className="flex justify-center mt-10 leftMargin">
                <div onClick={()=> {
                    shinyPokemon();
                }} className="bg-white/75 rounded-[235px] px-5 py-5 joe">
                    <img className="h-[235px] cursorEffect" src={pokemonImage} alt="charmander"/>
                </div>
                <div>
                    <img className='cursorEffect' src={favoriteIcon} alt="favorite icon"/>
                </div>
                
                
            </div>

            <div className="text-center text-[30px] mt-14 mx-7 juraBold">
                <p>Name: {`${pokemonName} #${pokemonID}`}</p>
                <p>Type: {pokemonType.map((type, idx:number) => {
                    return (
                        <>
                           {<span key={idx}>{`${type.type.name[0].toUpperCase()+type.type.name.substring(1)}`}
                           {idx !== pokemonType.length - 1 && ', '}
                           </span>}
                        </>
                    )
                })}</p>
                
                <p>Location Found: {pokemonLocation}</p>
                <div className="text-center">
                    <button onClick={handleFavorites} className="text-black bg-white opacity-75 h-[83px] w-[300px] sm:w-[398px] text-[30px] rounded-3xl px-5 py-2.5 mt-[37px] mb-[35px] xl:hidden juraBold" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">
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
                        <p className="text-[25px] juraRegular">{pokemonAbilities.map((ability, idx:number) => {
                            return(
                                <>
                                {<span key={idx}>{`${ability.ability.name}`}
                                {idx !== pokemonAbilities.length - 1 && ', '}</span>}
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
                            {pokemonMoves.map((move, idx:number) => {
                                return (
                                    <>
                                    {<span key={idx}>{`${move.move.name}`}
                                    {idx !== pokemonMoves.length - 1 && ', '}</span>}
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
            <button onClick={handleFavorites} className="text-black bg-white opacity-75 h-[83px] w-[398px] text-[30px] rounded-3xl px-5 py-2.5 mb-[113px] mt-[70px] juraBold" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">
                Open Favorites
            </button>
        </div>
    </div>
        

    </div>

    <div className={`${toggleFavorite} transition-transform fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800`}>
        <p className="text-[30px] mb-7 juraBold">Favorites</p>
        <button onClick={handleFavorites} type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-6 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close menu</span>
        </button>
    </div>

    </div>
  )
}

export default BodyComponent

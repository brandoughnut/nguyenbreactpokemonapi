import React, { useEffect, useState } from 'react'
import { getPokemon } from '../DataServices/DataServices'
import favoriteIcon from '../assets/pokemonfavorite.png';
import '../App.css';

const BodyComponent = () => {

    interface IType {
        name:string
        url:string
    }
    interface IPokemonType {
        slot:number
        type:IType
    }

    const [pokemonName, setPokemonName] = useState<string>('');
    const [pokemonID, setPokemonID] = useState<string>('');
    const [pokemonType, setPokemonType] = useState<IPokemonType[]>([]);
    const [pokemonImage, setPokemonImage] = useState<string>('');

    useEffect(() => {
        const getData = async () => {
            const pokemonData = await getPokemon('aggron');
            console.log(pokemonData);
            console.log(pokemonData.types);
            setPokemonType(pokemonData.types);
            setPokemonName(pokemonData.name);
            setPokemonID(pokemonData.id);
            setPokemonImage(pokemonData.sprites.other["official-artwork"].front_default);
        }
        getData();
    }, [])

  return (
    <div>

        <div
       className="fire min-h-screen bg-cover pt-[73px]"
    >

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 canvasBG">
        <div className="bg-white/75 h-auto xl:h-[617px] rounded-3xl">
            <div className="flex justify-center mt-10 leftMargin">
                <div className="bg-white/75 rounded-[235px] px-5 py-5 joe">
                    <img className="h-[235px] cursorEffect" src={pokemonImage} alt="charmander"/>
                </div>
                <div>
                    <img className='cursorEffect' src={favoriteIcon} alt="favorite icon"/>
                </div>
                
                
            </div>

            <div className="text-center text-[30px] mt-14 mx-7 juraBold">
                <p>Name: {`${pokemonName} #${pokemonID}`}</p>
                <p>Type: {pokemonType.map((pokemonType) => {
                    return (
                        <>
                           {`${pokemonType.type.name}, `}
                        </>
                    )
                })}</p>
                
                <p>Location Found: N/A</p>
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
                        <p className="text-[25px] juraRegular">blaze, solar-power</p>
                    </div>
                    
                </div>
            </div>
            <div className="bg-white/75 h-[290px] rounded-3xl">
                <div className="mt-8 marginPosition">
                    <p className="text-[30px] juraBold">Moves</p>
                    <div className="overflow-y-scroll h-44">
                        <p className="text-[25px] juraRegular">mega-punch, fire-punch, thunder-punch, scratch, swords-dance, cut, wing-attack, mega-kick, headbutt, body-slam, take-down, double-edge, leer, bite, growl, roar, ember, flamethrower, submission, counter, strength, dragon-rage, fire-spin</p>
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

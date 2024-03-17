import { ILocation, IPokemon, IPokemonSpecies } from "../Interfaces/Interface";

const getPokemon = async (pokemon:string) => {
    const retrieve = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const retrieveData: IPokemonSpecies = await retrieve.json();
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${retrieveData.id}`);
    const data:IPokemon = await promise.json();
    return data;

}

const LocationAPISearch = async (pokemon:string) => {
    const retreive = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const retriveData:IPokemonSpecies = await retreive.json();

    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${retriveData.id}/encounters`);
    const data:ILocation[] = await promise.json();
    return data;
    
}

const getPokemonName = async (pokemon:string) => {
    const retreive = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const retriveData:IPokemonSpecies = await retreive.json();
    return retriveData;
}

const getEvolution = async (pokemon:string) => {
    const promise = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const data:IPokemonSpecies = await promise.json();

    const promise2 = await fetch(data.evolution_chain.url);
    const data2:any = await promise2.json();

    return data2;
}

export {getPokemon, LocationAPISearch, getPokemonName, getEvolution}
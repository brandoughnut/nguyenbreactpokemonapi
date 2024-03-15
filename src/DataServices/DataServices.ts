const getPokemon = async (pokemon:string) => {
    const retrieve = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const retrieveData: any = await retrieve.json();

    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${retrieveData.id}`);
    const data:any = promise.json();
    return data;

}

const LocationAPISearch = async (pokemon:string) => {
    const retreive = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const retriveData = await retreive.json();

    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${retriveData.id}/encounters`);
    const data:any = await promise.json();
    return data;
    
}

const getPokemonName = async (pokemon:string) => {
    const retreive = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const retriveData = await retreive.json();
    return retriveData;
}

const getEvolution = async (pokemon:string) => {
    const promise = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const data = await promise.json();

    const promise2 = await fetch(data.evolution_chain.url);
    const data2 = await promise2.json();

    return data2;
}

export {getPokemon, LocationAPISearch, getPokemonName, getEvolution}
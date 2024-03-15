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

export {getPokemon, LocationAPISearch}
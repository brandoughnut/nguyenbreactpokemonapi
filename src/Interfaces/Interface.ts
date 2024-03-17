export interface IPokemonType {
    slot:number
    type:IType
}

interface IType {
    name:string
    url:string
}

export interface IPokemonMove {
    move:IMove
    version_group_details:[]
}

interface IMove {
    name:string
    url:string
}

export interface IPokemonAbilities {
    ability:IAbilities
}

interface IAbilities {
    name:string
    url:string
}

export interface IPokemonSpecies {
    id:number
    name:string
    evolution_chain:{
        url:string
    }
}

export interface IPokemon {
    abilities:IPokemonAbilities[]
    id:string
    name:string
    types:IPokemonType[]
    moves:IPokemonMove[]
    sprites:{
        other:{
            "official-artwork":{
                front_default:string
                front_shiny:string
            }
        }
    }
}
export interface ILocation {
    location_area:{
        name:string
        url:string
    }
}

export interface IEvolution {
    chain:Chain;
}

export interface Chain {
    evolves_to:Evolution[];
    species:Species;
}

export interface Evolution{
    evolves_to:Evolution[]
    species:Species
}

interface Species {
    name:string
    url:string
}
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
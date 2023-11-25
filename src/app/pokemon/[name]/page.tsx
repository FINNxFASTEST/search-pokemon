'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
    pokeName: string,
}

type pokeScheme = {
    "id": "",
    "number": "",
    "name": "",
    "weight": {
        "minimum": "",
        "maximum": ""
    },
    "height": {
        "minimum": "",
        "maximum": ""
    },
    "classification": "",
    "types": [
        ""
    ],
    "resistant": [
        ""
    ],
    "weaknesses": [
        ""
    ],
    "fleeRate": "",
    "maxCP": "",
    "maxHP": "",
    "image": "",
    "attacks": {
        "fast": [{
            "name": '',
            "type": '',
            "damage": '',
        }],
        "special": [{
            "name": "",
            "type": "",
            "damage": "",
        }]
    },
    "evolutionRequirements": {
        "amount": "",
        "name": "",
    },
    "evolutions": [{
        "name": null
    }],
}

type poke = {
    name: String,
}

export async function getPokemon(pokemonData: poke) {
    const headers = {
        "Content-Type": "application/json",
    };
    const requestBody = {
        query: ` 
            query pokemon($id: String, $name: String){
                pokemon(id: $id, name: $name){
                id
                number
                name
                weight{
                    minimum
                    maximum
                }
                height{
                    minimum
                    maximum
                }
                classification
                types
                resistant
                weaknesses
                fleeRate
                maxCP
                maxHP
                image
                attacks{
                    fast{
                    name
                    type
                    damage
                    }
                    special{
                    name
                    type
                    damage
                    }
                }
                evolutionRequirements {
                    amount
                    name
                }
                evolutions {
                    name
                }
                }
            }`,
        variables: { "name": pokemonData }
    }

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        cache: 'force-cache'
    };

    const res = await fetch('https://graphql-pokemon2.vercel.app', options)
    const data = await res.json()
    return data.data.pokemon
}

export default function SearchPokePage(prop: Props) {
    const param: any = useParams()
    const pokemonData = getPokemon(param.name)
    let miniComponent: any = [];
    const router = useRouter();
    const [pokeData, setPokeData] = useState({
        "id": "",
        "number": "",
        "name": "",
        "weight": {
            "minimum": "",
            "maximum": ""
        },
        "height": {
            "minimum": "",
            "maximum": ""
        },
        "classification": "",
        "types": [
            ""
        ],
        "resistant": [
            ""
        ],
        "weaknesses": [
            ""
        ],
        "fleeRate": "",
        "maxCP": "",
        "maxHP": "",
        "image": "",
        "attacks": {
            "fast": [{
                "name": '',
                "type": '',
                "damage": '',
            }],
            "special": [{
                "name": "",
                "type": "",
                "damage": "",
            }]
        },
        "evolutionRequirements": {
            "amount": "",
            "name": "",
        },
        "evolutions": [{
            "name": null
        }],
    }
    );

    useEffect(() => {
        const fetchData = async () => {
            const getPoke = await getPokemon(param.name)
            if ( getPoke){
                setPokeData(getPoke);
            }
        }
        fetchData();
    }, [])

    const getRandomInt = (max: any) => {
        return Math.floor(Math.random() * max);
    }

    return (
        <div className='flex min-h-screen flex-col items-center justify-start p-24' >

            <div className='justify-center mb-5'>
                <div className="grid grid-cols-2 gap-6">
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="bg-gray-500  text-white font-medium rounded-md px-2 py-1 hover:bg-gray-600 active:bg-gray-600 uppercase">
                        Back
                    </button>

                    {pokeData?.evolutions &&
                        <button
                            type="button"
                            onClick={() => router.push('/pokemon/' + pokeData.evolutions[0].name)}
                            className="bg-green-500  text-white font-medium rounded-md px-2 py-1 hover:bg-green-600 active:bg-green-600 uppercase">
                            Evolution
                        </button>
                    }
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-60">
                <div className="grid grid-cols-2 gap-6">

                    <h1 className='text-right'>id</h1>
                    <h1 className='text-left'>{pokeData.id}</h1>

                    <h1 className='text-right'>number</h1>
                    <h1 className='text-left'>{pokeData.number}</h1>

                    <h1 className='text-right'>name</h1>
                    <h1 className='text-left'>{pokeData.name}</h1>

                    <h1 className='text-right'>weight minimum</h1>
                    <h1 className='text-left'>{pokeData.weight.minimum}</h1>
                    <h1 className='text-right'>weight maximum</h1>
                    <h1 className='text-left'>{pokeData.weight.maximum}</h1>

                    <h1 className='text-right'>height minimum</h1>
                    <h1 className='text-left'>{pokeData.height.minimum}</h1>
                    <h1 className='text-right'>height maximum</h1>
                    <h1 className='text-left'>{pokeData.height.maximum}</h1>

                    <h1 className='text-right'>classification</h1>
                    <h1 className='text-left'>{pokeData.classification}</h1>

                    <h1 className='text-right'>types</h1>
                    <h1 className='text-left'>{pokeData.types}</h1>

                    <h1 className='text-right'>resistant</h1>
                    <h1 className='text-left'>{pokeData.resistant}</h1>

                    <h1 className='text-right'>weaknesses</h1>
                    <h1 className='text-left'>{pokeData.weaknesses}</h1>

                    <h1 className='text-right'>fleeRate</h1>
                    <h1 className='text-left'>{pokeData.fleeRate}</h1>

                    <h1 className='text-right'>maxCP</h1>
                    <h1 className='text-left'>{pokeData.maxCP}</h1>

                    <h1 className='text-right'>maxHP</h1>
                    <h1 className='text-left'>{pokeData.maxHP}</h1>

                </div>
                <div className="grid grid-cols-2 gap-6 h-60">
                    <div className=" grid-12">
                        <h3> Fast acttack: </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {
                            pokeData.attacks.fast.map((r) => {
                                return (
                                    <>
                                        <h3  > {r.name} </h3>
                                        <h3  > Damage : {r.damage} </h3>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className=" grid-12">
                        <h3> Special acttack: </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {
                            pokeData.attacks.special.map((r) => {
                                return (
                                    <>
                                        <h3 > {r.name} </h3>
                                        <h3 > Damage : {r.damage} </h3>
                                    </>
                                )
                            })
                        }
                    </div>

                    {pokeData.evolutionRequirements &&
                        <div >
                            <div className=" grid-12 mt-3">
                                <h3> Evolution require: </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-3">
                                <h3> {pokeData.evolutionRequirements.name} </h3>
                                <h3> {pokeData.evolutionRequirements.amount}  </h3>
                            </div>
                        </div>
                    }



                </div>
            </div>
            <div className='justify-center mt-5'>
                <img className='' src={pokeData.image} />
            </div>
        </div>
    )
}
'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
    const router  = useRouter()
    const [route, setRoute] = useState('')
    const [searBtnState , setSearBtnState] = useState(false);
    const findPath = () => {
        router.push("/pokemon/" + route)
    }

    useEffect(()=>{
        if( route ){
            setSearBtnState(current => !current);
        }
    },[route])

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Seach pokemons
                </label>
                <div className="mt-2">
                    <input
                        onChange={ (e) => setRoute(e.target.value) }
                        type="text"
                        name="pokemon_name"
                        id="pokemon_name"
                        placeholder='Pokemon name '
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900  ring-1 ring-inset ring-blue-500 text-md
                        placeholder:text-gray-400 placeholder:text-sm
                        focus:ring-1 focus:ring-inset focus:ring-blue-500"
                    />
                </div>
                <div className='mt-4 flex justify-center'>
                   
                    <button
                        type="button"
                        onClick={ findPath }
                        disabled={ !searBtnState}
                        className="bg-blue-500  text-white font-medium rounded-md px-2 py-1 hover:bg-blue-600 active:bg-blue-600 uppercase">
                        search
                    </button>
                </div>
            </div>
        </main>
    )
}

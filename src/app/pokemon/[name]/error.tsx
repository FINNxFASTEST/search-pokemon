"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function Error(prop: Props) {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center justify-start p-24' >
      <h1>Pokemom ot found</h1>
      <div className='mt-2'>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="bg-gray-500  text-white font-medium rounded-md px-2 py-1 hover:bg-gray-600 active:bg-gray-600 uppercase">
          Back
        </button>
      </div>
    </div>
  )
}
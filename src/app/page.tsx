"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [pokemon, setPokemon] = useState<any>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await res.json();
      console.log(data);
      
      setPokemon(data);
    }
    fetchPokemon();
  }, []);

  

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col gap-5 items-center justify-between py-12 px-6 
                      bg-white dark:bg-black sm:items-start max-h-screen">
        <div className="flex w-full bg-blue-900 h-auto p-5 rounded-2xl justify-center items-center">
          <h1 className="text-amber-200 font-bold text-3xl">Poke index</h1>
        </div>

        <div className="flex flex-1 gap-3 bg-blue-800 rounded-2xl shadow-2xl p-10 w-full h-full overflow-auto justify-start items-start flex-col">
          <div className="flex flex-row gap-2.5 shadow-xl p-3 w-full rounded-2xl bg-blue-700">
            <input type="text" className="flex flex-1 w-full" placeholder="Pikachu..."/>
            <button className="flex">
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 overflow-auto
                          w-full p-3">
            {pokemon.results?.map((data: any, index: any) => (
              <Link key={index} href={`/pokemon/${index +1}`}>
              <div className="relative flex flex-col justify-center items-center gap-2.5 p-3 rounded-2xl shadow-blue-950 shadow-lg bg-blue-700">
                <div className="absolute top-2 left-2 rounded-full bg-amber-200 w-6 h-6 flex justify-center items-center 
                                text-center text-black text-sm font-bold">{index+1}</div>
                <p className="text-center capitalize">{data.name}</p>
                <Image 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index +1}.png`}
                  alt={data.name}
                  width={100}
                  height={100}
                />
              </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

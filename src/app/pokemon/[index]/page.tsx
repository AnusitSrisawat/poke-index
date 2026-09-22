"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home1() {

  const [pokemon, setPokemon] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const index = params.index;
  useEffect(() => {
    if (!params.index) return;
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.index}`);
        const data = await res.json();
        console.log(data);
        
        if (data.types) {
          data.types = data.types.map((t: any) => {
            const parts = t.type.url.split("/").filter(Boolean);
            const typeId = parts[parts.length - 1];
            const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/${typeId}.png`;
            return {
              ...t,
              typeUrl: urlImage
            };
          });
        }
        
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemon detail:", error);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [params.index]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col gap-5 items-center justify-between py-12 px-6 
                      bg-white dark:bg-black sm:items-start max-h-screen">
        <div className="flex w-full bg-blue-900 h-auto p-5 rounded-2xl justify-between items-center">
          <Link href="/">
            <h1 className="text-amber-200 font-bold text-3xl">BACK</h1>
          </Link>
          <h1 className="text-amber-200 font-bold text-3xl">Poke index {index}</h1>
          <h1></h1>
        </div>

        <div className="flex flex-1 gap-3 bg-blue-800 rounded-2xl shadow-2xl p-10 w-full h-full overflow-auto justify-start items-center flex-col">
          {loading ? (
            <p className="text-center text-2xl text-amber-200">Loading...</p>
          ) : (
            <>
              <p className="text-center capitalize text-4xl">{pokemon?.name}</p>
              {(() => {
                const pokemonImage = pokemon?.sprites?.other?.['official-artwork']?.front_default 
                  || pokemon?.sprites?.front_default
                  || (index ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png` : null);

                return pokemonImage ? (
                  <div className="relative flex flex-col justify-center items-center gap-2.5 shadow-xl p-3 rounded-2xl bg-blue-700">
                    <Image
                      src={pokemonImage}
                      alt={pokemon?.name || "pokemon"}
                      width={200}
                      height={200}
                    />
                  </div>
                ) : null;
              })()}
              <div className="flex flex-row justify-start items-center gap-3">
                <p>Height: {pokemon?.height}</p>
                <p>Weight: {pokemon?.weight}</p>
                <p>Type: </p>
                <div className="flex flex-row gap-2">
                  {pokemon?.types?.map((item: any, itemIndex: number) => 
                    item.typeUrl ? (
                      <Image
                        key={itemIndex}
                        src={item.typeUrl}
                        alt={item.type?.name || "type"}
                        width={50}
                        height={50}
                      />
                    ) : null
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

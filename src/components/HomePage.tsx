import { useState, useEffect } from "react";

interface BasicPoki {
  name: string;
  url: string;
}

interface PokiDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
}

function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokis, setPokis] = useState<PokiDetails[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=12"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Data");
        }

        const data: { results: BasicPoki[] } = await response.json();

        const detailedPokis = await Promise.all(
          data.results.map(async (poki) => {
            const res = await fetch(poki.url);
            if (!res.ok) {
              throw new Error("Failed to fetch Pokémon details");
            }
            return res.json() as Promise<PokiDetails>;
          })
        );

        setPokis(detailedPokis);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-700 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center">
        <div className="rounded-lg bg-red-50 p-4 text-red-500">
          <p className="text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-stone-500">
          Pokémon List
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-4 sm:mx-0">
          {pokis.map((poki) => (
            <div
              key={poki.id}
              className="group relative overflow-hidden rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl"
            >
              <div className="relative">
                <h2 className="mb-4 text-center text-xl font-semibold capitalize text-gray-800">
                  {poki.name}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
                    <span className="text-sm font-medium text-gray-600">
                      Height
                    </span>
                    <span className="text-sm text-gray-800">
                      {((poki.height / 10) * 3.28084).toFixed(1)} feet
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
                    <span className="text-sm font-medium text-gray-600">
                      Weight
                    </span>
                    <span className="text-sm text-gray-800">
                      {(poki.weight / 10).toFixed(1)} kg
                    </span>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                      #{String(poki.id).padStart(3, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

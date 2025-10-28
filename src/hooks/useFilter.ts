import { useMemo, useState } from "react";

interface FilterablePokemon {
  isFavorite: boolean;
  nickname: string;
}

export const useFilter = <T extends FilterablePokemon>(data: T[]) => {
  const [filters, setFilters] = useState({
      isFavorite: false,
      nickname: "",
    });
  
    const filteredPokemons = useMemo(() => {
      let filteredPokemons = [...data];
  
      if (filters.isFavorite) {
        filteredPokemons = filteredPokemons.filter(
          (data) => data.isFavorite
        );
      }
  
      if (filters.nickname.trim() !== "") {
        filteredPokemons = filteredPokemons.filter((data) =>
          data.nickname
            .toLowerCase()
            .startsWith(filters.nickname.toLowerCase())
        );
      }
  
      return filteredPokemons;
    }, [data, filters]);
  
  return { filters, setFilters, filteredPokemons };
};

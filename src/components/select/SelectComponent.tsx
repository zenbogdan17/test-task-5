import { useEffect, useState } from 'react';
import Badge from '../badge/Badge';
import axios from 'axios';
import PokemonList from './PokemonList';
import { PokemonListType, PokemonType } from '../../types';

interface SelectComponentProps {
  disabled?: boolean;
  handlerSelectedPokemon: (item: PokemonType[]) => void;
  selectError?: boolean;
}

const SelectComponent = ({
  disabled,
  handlerSelectedPokemon,
  selectError,
}: SelectComponentProps) => {
  const [limitItem, setLimitItem] = useState(20);
  const [pokemonList, setPokemonList] = useState<PokemonListType | null>(null);
  const [errorSelect, setErrorSelect] = useState<string | null>(null);
  const [selectItem, setSelectItem] = useState<{ name: string; url: string }[]>(
    []
  );

  useEffect(() => {
    if (selectError) {
      setErrorSelect('Please select 4 pokemon');
    } else {
      setErrorSelect(null);
    }
  }, [selectError]);

  useEffect(() => {
    handlerSelectedPokemon(selectItem);
  }, [selectItem]);

  const handlerFetchData = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limitItem}`)
      .then(({ data }) => {
        setPokemonList(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {});
  };

  const handlerAddPokemon = (item: PokemonType) => {
    if (selectItem.length === 4) {
      return setErrorSelect(`You can't add more than 4 pokémon`);
    }

    const isDuplicate = selectItem.some(
      (selectedPokemon) => selectedPokemon.name === item.name
    );

    if (isDuplicate) {
      return setErrorSelect(`The pokémon "${item.name}" is already selected`);
    }

    setSelectItem((prev) => [...prev, item]);
  };

  const handlerDeletePokemon = (item: PokemonType) => {
    setSelectItem((prev) => prev.filter(({ name }) => name !== item.name));
  };

  return (
    <div className="mb-5">
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium leading-6 ">
          Select pokemon
        </label>
        <div
          className={`flex items-center border border-gray-400 gap-1 w-[400px] h-10 rounded-lg py-2 px-4 relative
          ${!disabled && 'hover:ring-2 hover:ring-indigo-500'}
          ${disabled && ' bg-slate-200 cursor-not-allowed'}
          ${errorSelect ? 'border-2 border-red-600' : 'border border-gray-400'}
        `}
        >
          <div className="flex gap-1 w-[330px] overflow-hidden">
            {selectItem.map((item) => (
              <Badge
                key={item.name}
                label={item.name}
                handlerClick={() => handlerDeletePokemon(item)}
              />
            ))}
          </div>

          {!disabled && (
            <svg
              onClick={() => {
                setSelectItem([]);
                setErrorSelect('');
              }}
              className={`w-5 h-5 text-gray-700 absolute right-8 top-[10px] cursor-pointer`}
            >
              <use xlinkHref="./sprite.svg#close" />
            </svg>
          )}
          {!disabled && (
            <svg
              onClick={handlerFetchData}
              className={`w-5 h-5 text-gray-700 absolute right-2 top-[10px] cursor-pointer`}
            >
              <use xlinkHref="./sprite.svg#select" />
            </svg>
          )}
        </div>
        <p
          className={`block text-gray-500 text-sm font-medium leading-6 
          ${errorSelect && 'text-red-600'}
        `}
        >
          {errorSelect}
        </p>
      </div>
      {pokemonList && (
        <PokemonList pokemonList={pokemonList} addPokemon={handlerAddPokemon} />
      )}
    </div>
  );
};

export default SelectComponent;

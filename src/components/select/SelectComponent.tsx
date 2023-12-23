import { useEffect, useState } from 'react';
import Badge from '../badge/Badge';
import axios from 'axios';
import PokemonList from './PokemonList';
import { PokemonListType, PokemonType } from '../../types';
import Button from '../button/Button';
import FilterModal from '../modal/FilterModal';

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
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<PokemonListType | null>(null);
  const [errorSelect, setErrorSelect] = useState<string | null>(null);
  const [selectItem, setSelectItem] = useState<{ name: string; url: string }[]>(
    []
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limitItem}&offset=${offset}`
      )
      .then(({ data }) => {
        setPokemonList(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    handlerFetchData();
  }, [limitItem, offset]);

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

  const handleBadgeClick = () => {};

  const handleBadgeClose = (item: PokemonType) => {
    setSelectItem((prev) => prev.filter(({ name }) => name !== item.name));
  };

  return (
    <>
      <div className="mb-5">
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium leading-6 ">
            Select pokemon
          </label>
          <div
            className={`flex flex-col gap-6 lg:flex-row relative mb-4 ${
              errorSelect && 'mb-7'
            }`}
          >
            <div
              className={`flex  items-center border border-gray-400 gap-1 w-auto sm:w-[400px] h-10 rounded-lg py-2 px-4 relative cursor-pointer
              ${!disabled && 'hover:ring-2 hover:ring-indigo-500'}
             ${disabled && ' bg-slate-200 cursor-not-allowed'}
              ${
                errorSelect
                  ? 'border-2 border-red-600'
                  : 'border border-gray-400'
              }`}
              onClick={handlerFetchData}
            >
              <div className="flex gap-1 w-auto sm:w-[330px] mr-10 sm:mr-0 overflow-hidden">
                {selectItem.map((item) => (
                  <Badge
                    key={item.name}
                    label={item.name}
                    handlerClick={() => handleBadgeClick}
                    handlerClickOnClose={() => handleBadgeClose(item)}
                  />
                ))}
              </div>

              {!disabled && selectItem.length > 0 && (
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

              <p
                className={`block text-gray-500 text-sm font-medium leading-6 absolute left-0 bottom-[-25px]
                 ${errorSelect && 'text-red-600'}`}
              >
                {errorSelect}
              </p>
            </div>
            <div>
              <Button
                outline
                size="lg"
                onClick={() => setIsFilterModalOpen(true)}
              >
                <span>
                  <svg className={`w-6 h-6 text-indigo-600 right-1 top-[7px]`}>
                    <use xlinkHref="./sprite.svg#filter" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
        {pokemonList && (
          <PokemonList
            pokemonList={pokemonList}
            addPokemon={handlerAddPokemon}
          />
        )}
      </div>

      {isFilterModalOpen && (
        <FilterModal
          setLimitItem={(count) => setLimitItem(count)}
          setOffset={(page) => setOffset(page)}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}
    </>
  );
};

export default SelectComponent;

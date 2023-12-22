import { useState } from 'react';
import Badge from '../badge/Badge';

import ModalPokemonInfo from '../modal/ModalPokemonInfo';
import { PokemonListType, PokemonType } from '../../types';

interface PokemonListProps {
  pokemonList: PokemonListType | null;
  addPokemon: ({}: PokemonType) => void;
}

const PokemonList = ({ pokemonList, addPokemon }: PokemonListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonUrl, setPokemonUrl] = useState('');

  const handleBadgeClick = (url: string) => {
    setPokemonUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex gap-2 flex-wrap border-2 border-indigo-600 rounded-xl p-3 mt-4">
      {pokemonList?.results.map((item) => (
        <Badge
          key={item.name}
          forViewing
          label={item.name}
          handlerClick={() => handleBadgeClick(item.url)}
        />
      ))}
      {isModalOpen && (
        <ModalPokemonInfo
          addPokemon={(data) => addPokemon(data)}
          onClose={closeModal}
          pokemonUrl={pokemonUrl}
        />
      )}
    </div>
  );
};

export default PokemonList;

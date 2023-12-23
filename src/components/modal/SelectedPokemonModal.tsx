import Modal from './Modal';
import { PokemonType } from '../../types';
import Badge from '../badge/Badge';
import { useState } from 'react';
import ModalPokemonInfo from './ModalPokemonInfo';

interface SelectedPokemonModalProps {
  onClose: () => void;
  yourData?: {
    name: string;
    lastName: string;
    pokemons: PokemonType[];
  };
}

const SelectedPokemonModal = ({
  onClose,
  yourData,
}: SelectedPokemonModalProps) => {
  const [modalPokemonOpen, setModalPokemonOpen] = useState(false);
  const [pokemonUrl, setPokemonUrl] = useState('');

  const handleBadgeClick = (url: string) => {
    setPokemonUrl(url);
    setModalPokemonOpen(true);
  };

  return (
    <>
      <Modal onClose={onClose}>
        <div className="flex flex-col gap-4 relative w-[70vw] lg:w-[35vw] p-5">
          <svg
            onClick={onClose}
            className={`w-8 h-8 text-black absolute right-2 top-2 block cursor-pointer 
            `}
          >
            <use xlinkHref="./sprite.svg#close" />
          </svg>

          <h1>Your personage</h1>
          <div>
            <h3>
              <span className="text-gray-600 text-lg border-b-2">
                Nickname:
              </span>{' '}
              {yourData?.name} {yourData?.lastName}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-gray-600 text-lg border-b-2">Pokemons:</span>
            {yourData?.pokemons.map((pokemon) => (
              <Badge
                label={pokemon.name}
                forViewing
                handlerClick={() => handleBadgeClick(pokemon.url)}
              />
            ))}
          </div>
        </div>
      </Modal>
      {modalPokemonOpen && (
        <div className="z-[999999]">
          <ModalPokemonInfo
            onClose={() => setModalPokemonOpen(false)}
            pokemonUrl={pokemonUrl}
          />
        </div>
      )}
    </>
  );
};

export default SelectedPokemonModal;

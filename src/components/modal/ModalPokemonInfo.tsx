import { useEffect, useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { PokemonInfo, PokemonType } from '../../types';
import firstLetterInCapital from '../../utils/firstLetterInCapital';
import Button from '../button/Button';

interface ModalPokemonInfoProps {
  onClose: () => void;
  pokemonUrl: string;
  addPokemon: ({}: PokemonType) => void;
}

const ModalPokemonInfo = ({
  onClose,
  pokemonUrl,
  addPokemon,
}: ModalPokemonInfoProps) => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | undefined>();

  useEffect(() => {
    axios
      .get(`${pokemonUrl}`)
      .then(({ data }) => {
        setPokemonInfo(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {});
  }, [pokemonUrl]);

  return (
    <Modal onClose={onClose}>
      <div className=" w-[30vw] p-5">
        <h2 className="text-center">
          {firstLetterInCapital(pokemonInfo?.name) ?? 'Unknown Pokemon'}
        </h2>

        <img
          className="m-5 mx-auto"
          src={pokemonInfo?.sprites?.other?.dream_world?.front_default ?? ''}
          alt={`Image of ${pokemonInfo?.name}`}
        />

        <Button
          onClick={() => {
            onClose();
            addPokemon({ name: pokemonInfo?.name ?? '', url: pokemonUrl });
          }}
          size="lg"
          primary
        >
          Add Pokemon
        </Button>
      </div>
    </Modal>
  );
};

export default ModalPokemonInfo;

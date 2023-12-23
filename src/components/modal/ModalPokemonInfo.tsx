import { useEffect, useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { PokemonInfo, PokemonType } from '../../types';
import firstLetterInCapital from '../../utils/firstLetterInCapital';
import Button from '../button/Button';

interface ModalPokemonInfoProps {
  onClose: () => void;
  pokemonUrl: string;
  addPokemon?: ({}: PokemonType) => void;
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
      <div className="relative overflow-auto w-[80vw] lg:w-[50vw] p-5">
        <svg
          onClick={onClose}
          className={`w-8 h-8 text-black absolute right-2 top-2 block cursor-pointer 
            `}
        >
          <use xlinkHref="./sprite.svg#close" />
        </svg>

        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mb-5">
          <img
            className="m-5 mx-auto w-60"
            src={pokemonInfo?.sprites?.other?.dream_world?.front_default ?? ''}
            alt={`Image of ${pokemonInfo?.name}`}
          />

          <div className="flex flex-col gap-2 lg:gap-3">
            <div className="flex items-center gap-2">
              <p className=" text-gray-600 text-lg border-b-2">Name: </p>

              <h2 className=" text-base lg:text-xl text-center">
                {firstLetterInCapital(pokemonInfo?.name) ?? 'Unknown Pokemon'}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <p className=" text-gray-600 text-lg border-b-2">Abilities: </p>

              {pokemonInfo?.abilities.map((item, i) => (
                <h2 key={i} className="text-base lg:text-xl text-center">
                  {firstLetterInCapital(item.ability.name)}{' '}
                  {i !== pokemonInfo?.abilities.length - 1 && ','}
                </h2>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <p className=" text-gray-600 text-lg border-b-2">Forms: </p>

              {pokemonInfo?.forms.map((item, i) => (
                <h2
                  key={item.name}
                  className="text-base lg:text-xl text-center"
                >
                  {item.name}
                  {i !== pokemonInfo?.forms.length - 1 && ','}
                </h2>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <p className=" text-gray-600 text-lg border-b-2">Height: </p>

              <h2 className="text-base lg:text-xl text-center">
                {pokemonInfo?.height}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <p className=" text-gray-600 text-lg border-b-2">Weight: </p>

              <h2 className="text-base lg:text-xl text-center">
                {pokemonInfo?.weight}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <p className=" text-gray-600 text-lg border-b-2">Stats: </p>

              {pokemonInfo?.stats.map((item, i) => (
                <h2 key={i} className="text-base lg:text-xl text-center">
                  {item.base_stat} {item.stat.name}
                  {i !== pokemonInfo?.stats.length - 1 && ','}
                </h2>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <p className=" text-gray-600 text-lg border-b-2">Types: </p>

              {pokemonInfo?.types.map((item, i) => (
                <h2
                  key={item.slot}
                  className="text-base lg:text-xl text-center"
                >
                  {item.slot} slot: {item.type.name}
                  {i !== pokemonInfo?.types.length - 1 && ','}
                </h2>
              ))}
            </div>
          </div>
        </div>
        {addPokemon && (
          <div className="flex justify-center">
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
        )}
      </div>
    </Modal>
  );
};

export default ModalPokemonInfo;

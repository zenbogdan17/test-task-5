import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './input/Input';
import Button from './button/Button';
import SelectComponent from './select/SelectComponent';
import { PokemonType } from '../types';
import { useState } from 'react';
import SelectedPokemonModal from './modal/SelectedPokemonModal';

const Form = () => {
  const [selectError, setSelectError] = useState(false);
  const [isOpenModalSelected, setIsOpenModalSelected] = useState(false);
  const [yourData, setYourData] = useState<{
    name: string;
    lastName: string;
    pokemons: PokemonType[];
  }>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      lastName: '',
      selectedPokemon: undefined,
      limitItem: 20,
      offset: 0,
    },
  });

  const selectedPokemon = watch('selectedPokemon');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (selectedPokemon.length < 4) {
      setSelectError(true);
      return;
    }
    setYourData({
      name: data.name,
      lastName: data.lastName,
      pokemons: data.selectedPokemon,
    });
    setIsOpenModalSelected(true);
  };

  const handlerSelectedPokemon = (item: PokemonType[]) => {
    setValue('selectedPokemon', item);
    setSelectError(false);
  };

  return (
    <>
      <div className="flex justify-center">
        <form
          className="border-2 border-indigo-600 w-[70vw] h-auto rounded-xl p-5 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 xl:flex-row ">
            <Input
              id="name"
              errors={errors}
              placeholder="Enter your name"
              required
              register={register}
              label="Name"
              subtitle="This information is required"
            />
            <Input
              id="lastName"
              errors={errors}
              placeholder="Enter your last name"
              required
              register={register}
              label="Last Name"
              subtitle="This information is required"
            />
          </div>

          <SelectComponent
            selectError={selectError}
            handlerSelectedPokemon={(item: PokemonType[]) =>
              handlerSelectedPokemon(item)
            }
          />

          <Button type="submit" size="lg" primary>
            {'Send'}
          </Button>
        </form>
      </div>

      {isOpenModalSelected && (
        <SelectedPokemonModal
          yourData={yourData}
          onClose={() => setIsOpenModalSelected(false)}
        />
      )}
    </>
  );
};

export default Form;

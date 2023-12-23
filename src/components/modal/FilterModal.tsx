import { FieldValues, useForm } from 'react-hook-form';
import Modal from './Modal';
import Button from '../button/Button';
import Input from '../input/Input';

interface FilterModalProps {
  onClose: () => void;
  setLimitItem: (count: number) => void;
  setOffset: (page: number) => void;
}

const FilterModal = ({
  onClose,
  setLimitItem,
  setOffset,
}: FilterModalProps) => {
  const {
    register,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { limitItem: 20, offset: 0 },
  });

  const handlerFilter = () => {
    const limitItem = getValues('limitItem');
    const offset = getValues('offset');

    if (limitItem < 0) {
      setError('limitItem', { message: 'Limit Item must not be less than 0' });
      return;
    }

    if (limitItem > 1000) {
      setError('limitItem', {
        message: 'Limit Item must not be more than 1000',
      });
      return;
    }

    if (offset < 0) {
      setError('offset', { message: 'Offset must not be less than 0' });
      return;
    }

    if (offset > 1000) {
      setError('offset', { message: 'Offset must not be more than 1000' });
      return;
    }

    setLimitItem(limitItem);
    setOffset(offset);

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4 relative w-[35vw] p-5">
        <svg
          onClick={onClose}
          className={`w-8 h-8 text-black absolute right-2 top-2 block cursor-pointer 
            `}
        >
          <use xlinkHref="./sprite.svg#close" />
        </svg>

        <Input
          id="limitItem"
          type="number"
          errors={errors}
          placeholder="Enter limit item"
          required
          register={register}
          label="Limit Item"
          subtitle="This information is required"
        />
        <Input
          id="offset"
          type="number"
          errors={errors}
          placeholder="Enter page offset"
          required
          register={register}
          label="Offset"
          subtitle="This information is required"
        />

        <Button onClick={handlerFilter} primary size="lg">
          Apply filters
        </Button>
      </div>
    </Modal>
  );
};

export default FilterModal;

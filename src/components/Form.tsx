import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './input/Input';
import Button from './button/Button';
import SelectComponent from './select/SelectComponent';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', lastName: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center">
      <form
        className="border-2 border-indigo-600 w-[70vw] h-auto rounded-xl p-5 gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-5">
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

        <SelectComponent label="Select pokemon" />

        <Button type="submit" size="lg" primary>
          {'Send'}
        </Button>
      </form>
    </div>
  );
};

export default Form;

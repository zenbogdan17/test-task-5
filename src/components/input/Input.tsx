import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface InputProps {
  label?: string;
  subtitle?: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input = ({
  label,
  subtitle,
  id,
  type,
  placeholder,
  required,
  register,
  errors,
  disabled,
}: InputProps) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium leading-6 " htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, {
            required,
            minLength: {
              value: 2,
              message: `${label} must be at least 2 characters long`,
            },
            maxLength: {
              value: 12,
              message: `${label} must be at most 12 characters long`,
            },
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: 'Only characters from a-z and A-Z are accepted',
            },
          })}
          placeholder={placeholder}
          className={`w-[400px] h-10 rounded-lg py-3 px-4 gap-2 
          placeholder:text-gray-400 placeholder:text-sm 
          focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-none
          ${!disabled && 'hover:ring-2 hover:ring-indigo-500'}
          ${disabled && 'bg-slate-200  cursor-not-allowed'}
          ${errors[id] ? 'border-2 border-red-600' : 'border border-gray-400'}
          `}
        ></input>
        <p
          className={`block text-gray-500 text-sm font-medium leading-6 
        ${errors[id] && 'text-red-600'}
        `}
        >
          {errors[id] ? (errors[id] as FieldError)?.message : subtitle}
        </p>
      </div>
    </div>
  );
};

export default Input;

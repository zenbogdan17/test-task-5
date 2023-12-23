import { ReactNode } from 'react';

enum ButtonSize {
  xs = 'xs',
  sm = 'sm',
  base = 'base',
  lg = 'lg',
  xl = 'xl',
}

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  outline?: boolean;
  primary?: boolean;
  size?: keyof typeof ButtonSize;
}

const Button = ({
  children,
  type = 'button',
  onClick,
  disabled,
  outline,
  primary,
  size = 'sm',
}: ButtonProps) => {
  const getHeight = () => {
    switch (size) {
      case ButtonSize.xs:
        return 'h-5 text-xs';
      case ButtonSize.sm:
        return 'h-6 text-sm';
      case ButtonSize.base:
        return 'h-8 text-base';
      case ButtonSize.lg:
        return 'h-10 text-lg';
      case ButtonSize.xl:
        return 'h-12 text-xl';
      default:
        return 'h-8 text-base';
    }
  };

  return (
    <button
      type={type}
      className={`${getHeight()} px-4 text-center rounded-md cursor-pointer 
      ${primary && 'bg-indigo-600 text-white hover:bg-indigo-500'}
      ${disabled && primary && 'bg-indigo-500 cursor-not-allowed'} 
      ${
        outline &&
        'border-2 border-indigo-500 text-indigo-500 hover:bg-slate-200 focus:border-4 focus:border-indigo-600'
      }
      ${
        disabled &&
        outline &&
        ' border-none bg-slate-200 text-opacity-60 cursor-not-allowed'
      }
    `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

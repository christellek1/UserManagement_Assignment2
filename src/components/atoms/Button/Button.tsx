import React from 'react';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...rest }) => {
  const base = 'px-3 py-2 rounded shadow text-sm';
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700',
    secondary: 'bg-white text-primary',
    danger: 'bg-[#fb2c35] text-white hover:bg-red-600'
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
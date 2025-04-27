import React from 'react';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  ...rest 
}) => {
  const base = 'px-3 py-2 rounded shadow text-sm flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700',
    secondary: 'bg-white text-primary',
    danger: 'bg-[#fb2c35] text-white hover:bg-red-600'
  };

  return (
    <button 
      className={`${base} ${variants[variant]}`} 
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading && (
        <svg 
          className="animate-spin h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
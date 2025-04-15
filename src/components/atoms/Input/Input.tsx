import React from 'react';
import { InputProps } from './Input.types';

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input
      className="
        w-60 py-4 text-sm border rounded-md shadow-sm h-10 cursor-default 
        bg-white text-black placeholder-gray-500 border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        dark:bg-[#1e293b] dark:text-white dark:placeholder-white dark:border-gray-600
      "
      {...rest}
    />
  );
};

export default Input;

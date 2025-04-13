// src/components/atoms/Input.tsx
import React from 'react';
import { InputProps } from './Input.types';

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input
      className="w-60 py-4 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 bg-white h-10 cursor-default text-black"
      {...rest}
    />
  );
};

export default Input;

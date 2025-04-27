// src/components/atoms/Icon.tsx
import { FiMoon } from 'react-icons/fi';

interface IconProps {
  onClick?: () => void;
  className?: string;
}

const Icon = ({ onClick, className = '' }: IconProps) => (
  <div 
    onClick={onClick} 
    className={`text-xl cursor-pointer text-white ${className}`}
    aria-label="Toggle dark mode"
  >
    <FiMoon />
  </div>
);

export default Icon;
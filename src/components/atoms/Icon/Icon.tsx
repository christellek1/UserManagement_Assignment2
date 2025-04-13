import { FiMoon } from 'react-icons/fi';

interface IconProps {
  onClick: () => void;
}

const Icon = ({ onClick }: IconProps) => (
  <div 
    onClick={onClick} 
    className="text-xl cursor-pointer text-white"
  >
    <FiMoon />
  </div>
);

export default Icon;
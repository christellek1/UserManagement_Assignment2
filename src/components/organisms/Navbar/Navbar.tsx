// src/components/organisms/Navbar.tsx
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button';
import { useAuthStore } from '../../../store/authStore';
import Icon from '../../atoms/Icon';
import { useState } from 'react';

interface NavbarProps {
  onToggleDarkMode: () => void;
}

const Navbar = ({ onToggleDarkMode }: NavbarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleCreateUser = () => {
    navigate('/dashboard/new');
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-primary dark:bg-gray-900 relative">
      <h1 className="text-lg font-semibold text-white dark:text-white mr-8">
        User Management
      </h1>
      <div className="flex items-center gap-4">
        <Button 
          variant="secondary" 
          onClick={handleCreateUser}
        >
          Create User
        </Button>
        
        <div className="relative">
          <Button 
            variant="danger" 
            onClick={handleLogoutClick}
          >
            Logout
          </Button>

          {showLogoutConfirm && (
            <div className="absolute right-0 top-full mt-2 w-64 p-4 rounded-lg shadow-xl z-50 border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600">
              <p className="mb-4 text-base font-medium text-gray-800 dark:text-white">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={handleCancelLogout}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200/10 transition-colors focus:outline-none"
          aria-label="Toggle dark mode"
        >
          <Icon 
            onClick={onToggleDarkMode}
            className="text-white hover:text-yellow-300 transition-colors"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
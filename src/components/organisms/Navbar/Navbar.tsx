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

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-primary dark:bg-gray-900 relative">
      <h1 className="text-lg font-semibold text-white dark:text-white mr-8">
        User Management
      </h1>
      <div className="flex items-center gap-3 ml-2">
        <Button variant="secondary">Create User</Button>
        <div className="relative">
          <Button variant="danger" onClick={handleLogoutClick}>
            Logout
          </Button>

          {showLogoutConfirm && (
            <div className="absolute right-0 top-full mt-2 w-64 p-4 rounded-lg shadow-xl z-50 border border-gray-200 bg-white dark:bg-[#1e293b] dark:border-gray-600">
              <p className="mb-4 text-base font-medium text-gray-800 dark:text-white">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelLogout}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  No
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                >
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="ml-2">
          <Icon onClick={onToggleDarkMode} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

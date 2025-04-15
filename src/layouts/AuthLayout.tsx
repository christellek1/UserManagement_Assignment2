import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/organisms/Navbar';

const AppLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-white'} text-gray-900 dark:text-white`}
    >
      <Navbar onToggleDarkMode={handleToggleDarkMode}  />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
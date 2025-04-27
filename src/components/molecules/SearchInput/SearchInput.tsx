// src/components/molecules/SearchInput.tsx
import { useEffect } from 'react';
import Input from '../../atoms/Input';
import { useAuthStore } from '../../../store/authStore';
import { useUserStore } from '../../../store/UserStore';

const SearchInput = () => {
  const { accessToken } = useAuthStore();
  const {
    searchTerm,
    setSearchTerm,
    fetchUsers,
  } = useUserStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Trigger API call when the search term changes (with debounce)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (accessToken) {
        fetchUsers(accessToken, searchTerm);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, accessToken, fetchUsers]);

  return (
    <div className="m-4 mb-6">
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;

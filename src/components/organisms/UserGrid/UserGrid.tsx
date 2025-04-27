// src/components/organisms/UserGrid.tsx
import { useEffect } from 'react';
import UserCard from '../../molecules/UserCard';
import { useAuthStore } from '../../../store/authStore';
import { useUserStore } from '../../../store/UserStore';

const UserGrid = () => {
  const { accessToken } = useAuthStore();
  const {
    users,
    loading,
    error,
    fetchUsers,
  } = useUserStore();

  useEffect(() => {
    if (accessToken) {
      fetchUsers(accessToken);
    }
  }, [accessToken, fetchUsers]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      {users.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No users found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGrid;
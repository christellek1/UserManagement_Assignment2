import React, { useState, useEffect } from 'react';
import Button from '../../atoms/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'; // using lucide-react icons (very clean)

interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: 'active' | 'locked';
  dob?: string;
}

interface UserCardProps {
  user: User;
  onUserDeleted?: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onUserDeleted }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const queryClient = useQueryClient();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const initials = user.firstName[0] + (user.lastName ? user.lastName[0] : '');

  useEffect(() => {
    const deleted = sessionStorage.getItem('userDeleted');
    if (deleted === 'true') {
      toast.success('User successfully deleted');
      sessionStorage.removeItem('userDeleted');
    }
  }, []);

  const deleteUser = async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete user');
    }
    return response.json();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previousUsers = queryClient.getQueryData<User[]>(['users']);
      queryClient.setQueryData(['users'], (old: unknown) =>
        (Array.isArray(old) ? old.filter(u => u.id !== userId) : [])
      );
      toast.info('Deleting user...', { toastId: 'deleting-user', autoClose: false });
      return { previousUsers };
    },
    onError: (error: Error, _userId, context?: { previousUsers?: User[] }) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
      toast.dismiss('deleting-user');
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'], refetchType: 'active' });
      toast.dismiss('deleting-user');
    },
    onSuccess: (_data, userId) => {
      onUserDeleted?.(userId);
      sessionStorage.setItem('userDeleted', 'true');
      window.location.reload();
    }
  });

  const handleDelete = () => setShowDeleteConfirm(true);
  const confirmDelete = () => {
    deleteMutation.mutate(user.id);
    setShowDeleteConfirm(false);
  };
  const cancelDelete = () => {
    if (!deleteMutation.isPending) setShowDeleteConfirm(false);
  };
  const handleEdit = () => navigate(`/dashboard/edit/${user.id}`);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-start relative">
      <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
        {initials}
      </div>

      <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">
        {user.firstName} {user.lastName}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Email: {user.email}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Status: {user.status}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Date of Birth: {user.dob || 'Not specified'}
      </p>

      <div className="mt-4 flex gap-2 justify-end w-full ml-auto relative">
        <Button variant="primary" onClick={handleEdit} disabled={deleteMutation.isPending}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={deleteMutation.isPending}>
          Delete
        </Button>

        {/* Confirm Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Blurry Background */}
            <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-80 z-10 animate-fade-in">
              {/* Close Button */}
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={cancelDelete}>
                <X className="w-5 h-5" />
              </button>

              {/* Red Circle X Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-red-400 flex items-center justify-center">
                  <X className="w-8 h-8 text-red-400" />
                </div>
              </div>

              {/* Texts */}
              <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">Are you sure?</h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Do you really want to delete this user? This process cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={cancelDelete}
                  className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                  disabled={deleteMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;

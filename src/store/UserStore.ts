import { create } from 'zustand';
import { User } from '../components/molecules/UserCard/UserCard.types';
import { useQuery } from '@tanstack/react-query';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (searchTerm: string) => void;
  fetchUsers: (accessToken: string, searchTerm?: string) => Promise<void>;
}

const fetchUsersData = async (accessToken: string, searchTerm = ''): Promise<User[]> => {
  let url = '/api/users';
  if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.status === 401 ? 'Unauthorized' : 'Failed to fetch users');
  }

  const data = await response.json();
  const usersArray = data.result?.data?.users || [];
  
  if (!Array.isArray(usersArray)) {
    throw new Error('Invalid users data format');
  }

  return usersArray.map((user: any): User => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName || '',
    email: user.email,
    status: user.status?.toLowerCase() || 'active',
    dob: user.dob || user.dateOfBirth || '', // Handle both fields
    dateOfBirth: user.dateOfBirth || user.dob || '', // Maintain both in store
  }));
};

// React Query hook
export const useUsersQuery = (accessToken: string, searchTerm = '') => {
  return useQuery({
    queryKey: ['users', searchTerm],
    queryFn: () => fetchUsersData(accessToken, searchTerm),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,
  searchTerm: '',
  
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  
  fetchUsers: async (accessToken, searchTerm = '') => {
    set({ loading: true, error: null });
    
    try {
      const users = await fetchUsersData(accessToken, searchTerm);
      set({ users });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'An unknown error occurred',
        users: [] 
      });
    } finally {
      set({ loading: false });
    }
  },
}));

// Utility function to get either dob or dateOfBirth
export const getUserDob = (user: User): string => {
  return user.dob || user.dateOfBirth || 'Not specified';
};

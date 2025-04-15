// src/store/userStore.ts
import { create } from 'zustand';
import { User } from '../components/molecules/UserCard/UserCard.types';

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

      const mappedUsers = usersArray.map((user: any) => ({
        id: Number(user.id), // Convert to number to match User type
        firstName: user.firstName,
        lastName: user.lastName || '',
        email: user.email,
        status: user.status?.toLowerCase() || 'active',
        dob: user.dateOfBirth || user.dob || '',
      }));

      set({ users: mappedUsers });
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
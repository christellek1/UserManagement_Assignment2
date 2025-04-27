// src/api/users.ts
interface User {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    status: 'active' | 'locked';
    dateOfBirth: string;
  }
  
  interface GetUsersResponse {
    users: User[];
  }
  
  export const getUsers = async (search?: string): Promise<GetUsersResponse> => {
    const url = new URL('/api/users', window.location.origin);
    if (search) {
      url.searchParams.append('search', search);
    }
  
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
  
    return response.json();
  };
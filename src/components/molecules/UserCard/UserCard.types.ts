export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    dob: string;
  }
  
  export interface UserCardProps {
    user: User;
  }
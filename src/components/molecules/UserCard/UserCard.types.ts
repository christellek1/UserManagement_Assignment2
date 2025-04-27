// src/components/molecules/UserCard/UserCard.types.ts
export interface User {
  id: string | number; // Handle both string (mock) and number (real API) cases
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob?: string;        // Frontend preferred field
  dateOfBirth?: string; // For mock server compatibility
}
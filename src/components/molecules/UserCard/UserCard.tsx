import React from 'react';
import Button from '../../atoms/Button';
import { UserCardProps } from './UserCard.types';

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const initials = user.firstName[0] + (user.lastName ? user.lastName[0] : '');

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
        {initials}
      </div>
      <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">
        {user.firstName} {user.lastName}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Email: {user.email}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Status: {user.status}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Date of Birth: {user.dob}</p>
      <div className="mt-3 flex gap-2 justify-end w-full ml-auto">
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
};

export default UserCard;

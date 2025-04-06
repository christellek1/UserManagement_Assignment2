interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob: string;
}

// Static sample data
const sampleUsers: User[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.Doe@example.com', status: 'active', dob: '1990-05-15' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', status: 'locked', dob: '1988-10-22' },
  { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'Alice.johnson@example.com', status: 'active', dob: '1995-02-10' },
  { id: 4, firstName: 'Bob', lastName: '', email: 'bob.martin@example.com', status: 'locked', dob: '1980-08-05' },
  { id: 5, firstName: 'Charlie', lastName: 'Brown', email: 'charlie.Brown@example.com', status: 'active', dob: '1992-11-30' },
  { id: 6, firstName: 'David', lastName: 'Lee', email: 'david.lee@example.com', status: 'locked', dob: '1987-07-14' },
  { id: 7, firstName: 'Eve', lastName: '', email: 'eve.green@example.com', status: 'active', dob: '1993-09-21' },
  { id: 8, firstName: 'Frank', lastName: 'White', email: 'frank.white@example.com', status: 'active', dob: '1994-01-25' },
  { id: 9, firstName: 'Grace', lastName: 'Black', email: 'grace.black@example.com', status: 'locked', dob: '1985-03-17' },
  { id: 10, firstName: 'Hannah', lastName: '', email: 'hannah.purple@example.com', status: 'active', dob: '1996-12-03' },
];

// Simple presentational component for user cards
const UserCard = ({ user }: { user: User }) => {
  // Handle users with no last name
  const initials = user.firstName[0] + (user.lastName ? user.lastName[0] : '');
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      <div className="bg-[#3251D0] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
        {initials}
      </div>
      <h3 className="text-lg font-semibold mt-2">
        {user.firstName} {user.lastName}
      </h3>
      <p className="text-sm text-gray-600">Email: {user.email}</p>
      <p className="text-sm text-gray-600">Status: {user.status}</p>
      <p className="text-sm text-gray-600">Date of Birth: {user.dob}</p>
      <div className="mt-3 flex gap-2 justify-end w-full ml-auto">
        <button className="px-3 py-1 bg-[#3251D0] text-white rounded shadow hover:bg-blue-700 text-sm w-auto">
          Edit
        </button>
        <button className="px-3 py-1 bg-[#fb2c35] text-white rounded shadow hover:bg-red-600 text-sm w-auto">
          Delete
        </button>
      </div>
    </div>
  );
};

// Main component - purely presentational
const UserManagement = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
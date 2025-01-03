import React from 'react';
import { deleteUser as deleteUserApi } from '../api'; // Avoid naming conflict

function UserCard({ user, refreshUsers }) { // Accept refreshUsers as a prop
  const handleDelete = async (id) => {
    const res = await deleteUserApi(id); // Call the API function
    if (res) {
      console.log('User deleted successfully');
      refreshUsers(); // Refresh the user list
    } else {
      console.error('Error deleting user');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-500">
        Email: <span className="font-semibold">{user.email}</span>
      </p>
      <div className="mt-4 flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          View
        </button>
        {user.role !== 'admin' && ( // Only show delete for non-admin users
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;

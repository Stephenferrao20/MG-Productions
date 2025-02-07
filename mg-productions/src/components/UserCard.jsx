import { deleteUser as deleteUserApi } from '../api'; 
import PropTypes from 'prop-types';

function UserCard({ user, refreshUsers }) { 
  const handleDelete = async (id) => {
    const res = await deleteUserApi(id); 
    if (res) {
      console.log('User deleted successfully');
      refreshUsers(); 
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
UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  refreshUsers: PropTypes.func.isRequired,
};

export default UserCard;

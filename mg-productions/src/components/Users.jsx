import { useEffect } from 'react';
import UserCard from './UserCard';
import { useStateValue } from '../context/StateProvider';
import { getAllUsers } from '../api';

function Users() {
  const [{ allUsers }, dispatch] = useStateValue();

  const fetchUsers = async () => {
    const data = await getAllUsers();
    dispatch({
      type: 'SET_ALL_USERS',
      allUsers: data,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []); 

  return (
    <>
      <center>
        <div className="relative">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="Search"
            placeholder="Search for..."
            className="w-2/4 p-5 rounded-md border-gray-200 py-2.5 pe-10 shadow-md sm:text-sm"
          />
        </div>
      </center>
      <div className="user-list">
        {allUsers?.users && allUsers.users.length > 0 ? (
          allUsers.users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              refreshUsers={fetchUsers} // Pass refresh function
            />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </>
  );
}

export default Users;

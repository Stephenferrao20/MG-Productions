import React from 'react';
import { useStateValue } from '../../context/StateProvider';

function Profile() {
  const [{ user }] = useStateValue();

  if (!user) {
    return <p className="text-gray-700">Loading user information...</p>;
  }

  return (
    <article className="rounded-xl border border-gray-700 bg-gray-100 p-4">
      <div className="flex items-center gap-4">
        <img
          alt={user.name}
          src={user.imageURL || 'https://via.placeholder.com/150'}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{user.user || 'User'}</h3>
          {console.log(`user : ${user.json()}`)}
          {console.log(`user : ${user.user}`)}

          <div className="flow-root">
            <ul className="-m-1 flex flex-wrap">
              <li className="p-1 leading-none">
                <a href="#" className="text-xs font-medium text-gray-700">Twitter</a>
              </li>
              <li className="p-1 leading-none">
                <a href="#" className="text-xs font-medium text-gray-700">GitHub</a>
              </li>
              <li className="p-1 leading-none">
                <a href="#" className="text-xs font-medium text-gray-700">Website</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        <li>
          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <strong className="font-medium text-gray-900">Project A</strong>
            <p className="mt-1 text-xs font-medium text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </a>
        </li>
        <li>
          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <strong className="font-medium text-gray-900">Project B</strong>
            <p className="mt-1 text-xs font-medium text-gray-700">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </a>
        </li>
      </ul>
    </article>
  );
}

export default Profile;

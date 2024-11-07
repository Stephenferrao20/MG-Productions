import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
    const { isAuthenticated , user } = useAuth0();
  return (
    <article className="rounded-xl border border-gray-700 bg-gray-100 p-4">
  <div className="flex items-center gap-4">
    <img
      alt=""
      src={user.picture}
      className="size-16 rounded-full object-cover"
    />

    <div>
      <h3 className="text-lg font-medium text-gray">{user.name}</h3>

      <div className="flow-root">
        <ul className="-m-1 flex flex-wrap">
          <li className="p-1 leading-none">
            <a href="#" className="text-xs font-medium text-gray"> Twitter </a>
          </li>

          <li className="p-1 leading-none">
            <a href="#" className="text-xs font-medium text-gray"> GitHub </a>
          </li>

          <li className="p-1 leading-none">
            <a href="#" className="text-xs font-medium text-gray">Website</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <ul className="mt-4 space-y-2">
    <li>
      <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
        <strong className="font-medium text-gray">Project A</strong>

        <p className="mt-1 text-xs font-medium text-gray">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequuntur deleniti,
          unde ab ut in!
        </p>
      </a>
    </li>

    <li>
      <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
        <strong className="font-medium text-gray">Project B</strong>

        <p className="mt-1 text-xs font-medium text-gray">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
        </p>
      </a>
    </li>
  </ul>
</article>
  )
}

export default Profile

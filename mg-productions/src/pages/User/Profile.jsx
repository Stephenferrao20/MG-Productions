import { useStateValue } from '../../context/StateProvider';

function Profile() {
  const [{ user },dispatch] = useStateValue();

  if (!user) {
    return <p className="text-gray-700">Loading user information...</p>;
  }

  return (
    <article className="rounded-xl border border-gray-700 bg-gray-100 p-4">
      <div className="flex items-center gap-4">
        <img
          alt={user?.user?.name}
          src={user?.user?.imageURL}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-900">{user?.user?.name}</h3>
         

          <div className="flow-root">
            <ul className="-m-1 flex flex-wrap">
              <li className="p-1 leading-none">
                <a href="#" className="text-xs font-medium text-gray-700">Twitter</a>
              </li>
             
              
            </ul>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        <li>
          
        </li>
        <li>
          
        </li>
      </ul>
    </article>
  );
}

export default Profile;

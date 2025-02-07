import PropTypes from 'prop-types';

function ChatMember({ user, handleFunction, loadChats , selectedChat}) {
  const handleClick = () => {
    handleFunction();
    loadChats();
  };

  

  return (
    <div
      className="flex flex-row py-4 px-2 justify-center items-center border-b-2 rounded-lg"
      onClick={handleClick}  // Use the handleClick function here
    >
      <div className="w-1/4">
        <img
          src={user.imageURL}
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        {user.role !== 'admin' ? ( <div className="text-lg font-semibold">{user.name}</div>): ( <div className="text-lg font-semibold">{user.role}</div>)}
       
        {user.role !== 'admin' && (<span className="text-gray-500">{}</span>)}
        
      </div>
    </div>
  );
}
ChatMember.propTypes = {
  user: PropTypes.shape({
    imageURL: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  handleFunction: PropTypes.func.isRequired,
  loadChats: PropTypes.func.isRequired,
  selectedChat: PropTypes.shape({
    latestMessage: PropTypes.string,
  }),
};

export default ChatMember;

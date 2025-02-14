import PropTypes from 'prop-types'

function ChatSend({ message }) {
  return (
    <div className="flex justify-end mb-4">
              <div
                className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
              >
               {message.content}
              </div>
              <img
                src={message?.sender?.imageURL}
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            </div>
  )
}

ChatSend.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      imageURL: PropTypes.string,
    }),
  }).isRequired,
};

export default ChatSend

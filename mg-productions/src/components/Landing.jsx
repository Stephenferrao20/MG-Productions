import React from 'react'

const landing = () => {
    const [requestDetails, setRequestDetails] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequestDetails({
          ...requestDetails,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can integrate your backend or API to handle the request
        console.log("Request submitted:", requestDetails);
        alert('Your request has been sent!');
      };
  return (
    <div>
      {/* Hero Section */}
<div className="bg-gray-900 text-white py-20 px-5 text-center">
<h1 className="text-5xl font-bold mb-5">Welcome to MG Productions</h1>
<p className="text-xl mb-10">Your go-to place for custom music creations. Listen, explore, and request music from our talented creators.</p>
<button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">
  Explore Music
</button>
</div>

{/* Music Section */}
<div className="py-20 px-5 bg-white text-center">
<h2 className="text-3xl font-bold mb-10">Listen to Our Featured Tracks</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-gray-200 p-5 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold mb-3">Track 1</h3>
    <audio controls className="w-full">
      <source src="track1.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
  <div className="bg-gray-200 p-5 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold mb-3">Track 2</h3>
    <audio controls className="w-full">
      <source src="track2.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
  <div className="bg-gray-200 p-5 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold mb-3">Track 3</h3>
    <audio controls className="w-full">
      <source src="track3.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
</div>
</div>

{/* Request Section */}
<div className="bg-gray-100 py-20 px-5 text-center">
<h2 className="text-3xl font-bold mb-10">Request Custom Music</h2>
<form onSubmit={handleSubmit} className="max-w-md mx-auto">
  <div className="mb-6">
    <input
      type="text"
      name="name"
      value={requestDetails.name}
      onChange={handleInputChange}
      placeholder="Your Name"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      required
    />
  </div>
  <div className="mb-6">
    <input
      type="email"
      name="email"
      value={requestDetails.email}
      onChange={handleInputChange}
      placeholder="Your Email"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      required
    />
  </div>
  <div className="mb-6">
    <textarea
      name="message"
      value={requestDetails.message}
      onChange={handleInputChange}
      placeholder="Describe the music you want"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      rows="4"
      required
    ></textarea>
  </div>
  <button
    type="submit"
    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full"
  >
    Submit Request
  </button>
</form>
</div>

{/* Footer Section */}
<footer className="bg-gray-900 text-white py-10">
<div className="text-center">
  <p>&copy; 2024 MG Productions. All Rights Reserved.</p>
  <div className="mt-5">
    <a href="https://facebook.com" className="text-indigo-500 hover:underline mx-2">Facebook</a>
    <a href="https://twitter.com" className="text-indigo-500 hover:underline mx-2">Twitter</a>
    <a href="https://instagram.com" className="text-indigo-500 hover:underline mx-2">Instagram</a>
  </div>
</div>
</footer>

    </div>
  )
}

export default landing



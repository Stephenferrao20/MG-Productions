import { useEffect , useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import { getAllUsers } from '../api';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL  } from 'firebase/storage';
import { saveRequestData } from '../api';
import axios from 'axios';

function Request() {
    const [{ allUsers } , dispatch] = useStateValue();
    const [musicFile, setMusicFile] = useState(null);
    const [musicFileName , setMusicFileName] = useState('MusicFile')
    const [uploadProgress, setUploadProgress] = useState(0);
    

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            dispatch({
                type: 'SET_ALL_USERS',
                allUsers: data,
            });
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMusicFileName(file.name)
        if (!file) return;
        const storage = getStorage();
        const fileRef = ref(storage, `Request/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error(`Error uploading file:`, error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setMusicFile(downloadURL);
            });
          }
        );
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Ensure the music file is uploaded
        if (!musicFile) {
          alert('Please upload the music file.');
          return;
        }
      
        // Retrieve and validate the price from the form (in rupees)
        const priceValue = Number(e.target.elements.price.value);
        if (!priceValue || isNaN(priceValue)) {
          alert('Please enter a valid price.');
          return;
        }
      
        // Prepare the request data
        let requestData = {
          name: e.target.elements.title.value,
          users: e.target.elements.users.value,
          musicURL: musicFile,
          price: priceValue,  
          isPaid: false,      
        };
      
        try {
          const orderResponse = await axios.post("http://localhost:4000/api/payment/create-order", {
            price: priceValue * 100, 
          });
          const orderData = orderResponse.data;
          console.log("Order created:", orderData);
      
          // Validate that the orderData contains the necessary fields
          if (!orderData || !orderData.id || !orderData.amount || !orderData.currency) {
            throw new Error("Payment order creation failed or returned incomplete data.");
          }
      
          // 2. Attach the payment order details to the request data.
          requestData.orderId = orderData.id;
          requestData.orderAmount = orderData.amount; // amount in paise
          requestData.currency = orderData.currency;
      
          // 3. Save the request data (including payment order details) to your database.
          const savedRequest = await saveRequestData(requestData);
          if (!savedRequest) {
            throw new Error("Failed to save music request data.");
          }
      
          // Both operations succeeded.
          alert('Music request and payment setup completed successfully.');
        } catch (error) {
          console.error('Error during combined operation:', error);
          alert("Operation failed: " + error.message);
          
        }
      };
      
      


  return (
    <div
      className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 bg-no-repeat bg-cover"
    >
      <div className="absolute bg-gray-200 opacity-60 inset-0 -z-30"></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-0">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">Upload Request Music</h2>
        </div>
        {uploadProgress > 0 && (
          <div className="text-center mb-4">
            <p>Upload Progress: {uploadProgress}%</p>
          </div>
        )}
        <form className="mt-8 space-y-3" action="#" method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Music Title</label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Title"
              name='title'
            />
          </div>

          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Select User</label>
            <select
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Select User"
              name='users'
            >
              <option value="">Choose User</option>
              {allUsers?.users?.filter((allUser) =>{
                if(allUser.role !== 'admin'){
                    return allUser;
                }
              }).map((allUser) => (
                <option key={allUser._id} value={allUser._id}>
                  {allUser.name} 
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Upload Music</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                {
                  uploadProgress != 100 ? (
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <img
                      className="has-mask h-36 object-center p-1"
                      src="https://assets.dryicons.com/uploads/icon/svg/11234/af2ae7e4-66c4-4827-8161-c533579bf270.svg"
                      alt="Upload illustration"
                    />
                  </div>
                  <p className="pointer-none text-gray-500">
                    <span className="text-sm">Drag and drop</span> files here <br /> or{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      select a file
                    </a>{' '}
                    from your computer
                  </p>
                </div>
                ):(
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  
                  <p className="pointer-none text-gray-500">
                    {musicFileName}
                  </p>
                </div>
                )}
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e)}/>
              </label>
            </div>
          </div>
          
          <p className="text-sm text-gray-300">
            <span>File type: mp3</span>
          </p>

          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Set Price</label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Price"
              name='price'
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Request;

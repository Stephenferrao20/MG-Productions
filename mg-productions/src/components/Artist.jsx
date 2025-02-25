import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateValue } from '../context/StateProvider';
import { getAllArtists, deleteArtist } from '../api';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function Artist() {
    const [selectedTab, setSelectedTab] = useState('View Artists');
    const [artistData, setArtistData] = useState({ name: '', imageURL: '', instagram: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [{ allArtists }, dispatch] = useStateValue();

    const tabRoutes = {
        'View Artists': 'view',
        'Add Artist': 'add',
    };

    const fetchArtists = async () => {
        try {
            const data = await getAllArtists();
            dispatch({ type: 'SET_ALL_ARTISTS', allArtists: data });
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    useEffect(() => {
        if (!allArtists) fetchArtists();
    }, [allArtists]);

    const handleAddOrUpdateArtist = async () => {
        if (!artistData.name || !artistData.imageURL || !artistData.instagram) {
            alert('Please fill all fields.');
            return;
        }

        setIsLoading(true);
        try {
            if (editId) {
                // Update existing artist
                await axios.put(`/api/artists/update/${editId}`, artistData);
                alert('Artist updated successfully');
                setEditId(null);
            } else {
                // Add new artist
                await axios.post('/api/artists/save', artistData);
                alert('Artist added successfully');
            }
            setArtistData({ name: '', imageURL: '', instagram: '' });
            fetchArtists();
        } catch (error) {
            console.error('Error saving artist:', error);
            alert('Failed to save artist');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (artist) => {
        setArtistData({
            name: artist.name,
            imageURL: artist.imageURL,
            instagram: artist.instagram,
        });
        setEditId(artist._id);
        setSelectedTab('Add Artist');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this artist?')) return;
        try {
            await deleteArtist(id);
            alert('Artist deleted successfully');
            fetchArtists();
        } catch (error) {
            console.error('Error deleting artist:', error);
            alert('Failed to delete artist');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storage = getStorage();
        const fileRef = ref(storage, `Artist/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setUploadProgress(progress);
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error('Error uploading file:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setArtistData((prev) => ({ ...prev, imageURL: downloadURL }));
                });
            }
        );
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'View Artists':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">All Artists</h2>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : allArtists?.artist?.length > 0 ? (
                            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {allArtists.artist.map((artist) => (
                                    <li key={artist._id} className="p-4 border rounded shadow">
                                        <p className="font-medium"><strong>Name:</strong> {artist.name}</p>
                                        <p>
                                            <strong>Instagram:</strong> 
                                            <a 
                                                href={artist.instagram} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-blue-500 underline"
                                            >
                                                {artist.name}
                                            </a>
                                        </p>
                                        <img
                                            src={artist.imageURL}
                                            alt={artist.name}
                                            className="w-full h-40 object-cover mt-2 rounded"
                                        />
                                        <div className="mt-2 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(artist)}
                                                className="bg-yellow-500 text-white px-4 py-1 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(artist._id)}
                                                className="bg-red-500 text-white px-4 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No artists found</p>
                        )}
                    </div>
                );
            case 'Add Artist':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Artist' : 'Add New Artist'}</h2>
                        <input
                            type="text"
                            placeholder="Artist Name"
                            value={artistData.name}
                            onChange={(e) => setArtistData({ ...artistData, name: e.target.value })}
                            className="mb-4 w-full p-2 border rounded"
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mb-4 w-full p-2 border rounded"
                        />
                        {uploadProgress > 0 && (
                            <p>Upload Progress: {uploadProgress}%</p>
                        )}
                        <input
                            type="text"
                            placeholder="Instagram Link"
                            value={artistData.instagram}
                            onChange={(e) => setArtistData({ ...artistData, instagram: e.target.value })}
                            className="mb-4 w-full p-2 border rounded"
                        />
                        <button
                            onClick={handleAddOrUpdateArtist}
                            disabled={isLoading}
                            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : editId ? 'Update Artist' : 'Add Artist'}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Tab Navigation */}
            
            <div className="sm:hidden mb-4">
                <label htmlFor="Tab" className="sr-only">Select Tab</label>
                <select
                    id="Tab"
                    className="w-full rounded-md border-gray-300"
                    value={selectedTab}
                    onChange={(e) => setSelectedTab(e.target.value)}
                >
                    {Object.keys(tabRoutes).map((tab) => (
                        <option key={tab} value={tab}>
                            {tab}
                        </option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block mb-4">
                <nav className="flex gap-6 justify-center" aria-label="Tabs">
                    {Object.keys(tabRoutes).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
                                selectedTab === tab
                                    ? 'bg-sky-100 text-sky-600'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div>{renderTabContent()}</div>
        </div>
    );
}

export default Artist;

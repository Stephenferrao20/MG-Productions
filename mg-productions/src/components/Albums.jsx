import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Album() {
    const [selectedTab, setSelectedTab] = useState('View Albums');
    const [albums, setAlbums] = useState([]);
    const [albumData, setAlbumData] = useState({ name: '', imageURL: '' });
    const [isLoading, setIsLoading] = useState(false);

    const tabRoutes = {
        'View Albums': 'view',
        'Save Album': 'save',
    };

    useEffect(() => {
        if (selectedTab === 'View Albums') {
            fetchAlbums();
        }
    }, [selectedTab]);

    const fetchAlbums = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/albums/getAll');
            setAlbums(response.data.album || []);
        } catch (error) {
            console.error('Error fetching albums:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveAlbum = async () => {
        if (!albumData.name || !albumData.imageURL) {
            alert('Please fill all fields.');
            return;
        }
        setIsLoading(true);
        try {
            await axios.post('/api/albums/save', albumData);
            alert('Album saved successfully');
            setAlbumData({ name: '', imageURL: '' });
            fetchAlbums();
        } catch (error) {
            console.error('Error saving album:', error);
            alert('Failed to save album');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAlbumData({ ...albumData, imageURL: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'View Albums':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">All Albums</h2>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : albums.length > 0 ? (
                            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {albums.map((album) => (
                                    <li key={album._id} className="p-4 border rounded shadow">
                                        <p className="font-medium"><strong>Name:</strong> {album.name}</p>
                                        <img
                                            src={album.imageURL}
                                            alt={album.name}
                                            className="w-full h-40 object-cover mt-2 rounded"
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No albums found</p>
                        )}
                    </div>
                );
            case 'Save Album':
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Save New Album</h2>
                        <input
                            type="text"
                            placeholder="Album Name"
                            value={albumData.name}
                            onChange={(e) => setAlbumData({ ...albumData, name: e.target.value })}
                            className="mb-4 w-full p-2 border rounded"
                        />
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
                            <input type="file" onChange={handleFileUpload} className="block w-full" />
                            {albumData.imageURL && (
                                <img
                                    src={albumData.imageURL}
                                    alt="Preview"
                                    className="mt-4 w-32 h-32 object-cover border rounded"
                                />
                            )}
                        </div>
                        <button
                            onClick={handleSaveAlbum}
                            disabled={isLoading}
                            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Album'}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
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

export default Album;

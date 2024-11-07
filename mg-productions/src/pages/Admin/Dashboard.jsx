import React, { useState } from 'react';
import MusicUpload from '../MusicUpload';
import Chat from '../Chat';
import UploadRequest from '../UploadRequest';

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('Notifications');

  // Tab configuration
  const tabs = ['Upload Music', 'Messages', 'Upload Request', 'Notifications'];

  // Render content based on selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Upload Music':
        return <MusicUpload />;
      case 'Messages':
        return <Chat />;
      case 'Upload Request':
        return <UploadRequest/>;
      case 'Notifications':
        return <div>Notifications Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="">
      {/* Dropdown for small screens */}
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">Tab</label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>

      {/* Tab navigation for larger screens */}
      <div className="hidden sm:block">
        <nav className="flex gap-6 justify-center" aria-label="Tabs">
          {tabs.map((tab) => (
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

      {/* Render the content below the tabs */}
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
}

export default Dashboard;

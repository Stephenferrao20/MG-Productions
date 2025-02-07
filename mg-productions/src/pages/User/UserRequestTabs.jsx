import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Chat from '../Chat'; 
import RequestCard from '../../components/RequestCard';

function UserRequestTabs({user}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('Messages');

  const tabRoutes = {
    Messages: 'messages',
    'Requested Files': 'requested-files',
  };


  React.useEffect(() => {
    const currentRoute = location.pathname.split('/').pop();
    const matchingTab = Object.keys(tabRoutes).find(
      (tab) => tabRoutes[tab] === currentRoute
    );
    if (matchingTab) {
      setSelectedTab(matchingTab);
    } else {
      setSelectedTab('Messages');
      handleTabChange('Messages');
    }
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    navigate(`/request/${tabRoutes[tab]}`);
  };

  return (
    <div>
      {/* Dropdown for small screens */}
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">Select Tab</label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          value={selectedTab}
          onChange={(e) => handleTabChange(e.target.value)}
        >
          {Object.keys(tabRoutes).map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>

      {/* Tab navigation for larger screens */}
      <div className="hidden sm:block">
        <nav className="flex gap-6 justify-center" aria-label="Tabs">
          {Object.keys(tabRoutes).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
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

      {/* Tab content rendered based on the current route */}
      <div className="mt-6">
        <Routes>
          <Route path="messages" element={<Chat user={user}/>} />
          <Route path="requested-files" element={<RequestCard user={user}/>} />
        </Routes>
      </div>
    </div>
  );
}
UserRequestTabs.propTypes = {
  user: PropTypes.object.isRequired,
};


export default UserRequestTabs;

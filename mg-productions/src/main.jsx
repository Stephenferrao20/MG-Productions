import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App.jsx';
import './index.css';
import { StateProvider } from './context/StateProvider.jsx';
import {initialState} from './context/initialState.js';
import reducer from './context/reducer.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <StateProvider initialState={initialState} reducer={reducer}>
              <App />
          </StateProvider>
      </BrowserRouter>
  </StrictMode>
);

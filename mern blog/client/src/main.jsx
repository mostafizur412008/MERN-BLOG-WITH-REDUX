import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals'; // Import reportWebVitals
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';

// Render the App component within BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
  </Provider>
);

// Call the reportWebVitals function
reportWebVitals();

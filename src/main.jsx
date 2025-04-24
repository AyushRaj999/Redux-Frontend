import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Details from './component/SaveDetails.jsx';
import { Provider } from 'react-redux';
import { store } from './reduxStore/Store';
import './index.css';
import { useSelector } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import store from './redux/store';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <Routes/>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

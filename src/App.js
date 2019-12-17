import React from 'react';
import { Provider } from 'react-redux';

import HomePage from './HomePage';
import './App.css';
import store from './redux/store';

function App() {
  return (
      <Provider store={store}>
          <HomePage/>
      </Provider>
  );
}

export default App;

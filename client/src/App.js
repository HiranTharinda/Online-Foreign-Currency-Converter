import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import Calculator from './components/pages/calculator';
function App() {

  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
}

export default App;

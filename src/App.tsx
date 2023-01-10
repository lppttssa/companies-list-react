import React from 'react';
import './App.css';
import {HomePage} from "./pages/HomePage";
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;

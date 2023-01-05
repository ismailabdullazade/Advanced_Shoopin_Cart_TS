import React from 'react';
import './App.css';
import { Home } from './components/Home';
import { Store } from './components/Store';
import { About } from './components/About';

function App() {
  return (
    <div className="App">
      <About/>
      <Home/>
      <Store/>
    </div>
  );
}

export default App;

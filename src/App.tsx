import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import { Container, } from 'react-bootstrap';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Store } from './components/Store';
import { About } from './components/About';


function App() {
  return ( 
    <>
    <Navbar/>
    <Container>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/store' element={<Store/>}/>
          <Route path='/about' element={<About/>}/>
      </Routes>
    </Container>
    </>
  );
}

export default App;

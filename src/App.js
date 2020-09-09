import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Route exact path = "/" component = {HomePage}/>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import AdminPage from './components/AdminPage'
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Route exact path = "/" component = {HomePage}/>
      <Route path="/AdminPage" component = {AdminPage}/>
    </BrowserRouter>
  );
}

export default App;

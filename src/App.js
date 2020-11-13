import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import AdminPage from './components/AdminPage'
import OrderSetupPage from './components/OrderSetupPage'
import ProductSetupPage from './components/ProductSetupPage'
import EmployeeSetupPage from './components/EmployeeSetupPage'
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Route exact path = "/" component = {HomePage}/>
      <Route path="/AdminPage" component = {AdminPage}/>
      <Route path="/EmployeeSetupPage" component = {EmployeeSetupPage}/>
      <Route path="/ProductSetupPage" component = {ProductSetupPage}/>
      <Route path="/OrderSetupPage" component = {OrderSetupPage}/>
      
    </BrowserRouter>
  );
}

export default App;

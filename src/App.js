import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import BasketPage from './components/BasketPage'
import OrderSetupPage from './components/OrderSetupPage'
import ProductSetupPage from './components/ProductSetupPage'
import EmployeeSetupPage from './components/EmployeeSetupPage'
import OrderDetailPage from './components/OrderDetailPage'
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Route exact path = "/" component = {HomePage}/>
      <Route path="/BasketPage" component = {BasketPage}/>
      <Route path="/EmployeeSetupPage" component = {EmployeeSetupPage}/>
      <Route path="/ProductSetupPage" component = {ProductSetupPage}/>
      <Route path="/OrderSetupPage" component = {OrderSetupPage}/>
      <Route path="/OrderDetailPage" component = {OrderDetailPage}/>
      
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import AdminPage from './components/AdminPage'
import OrderSetupPage from './components/OrderSetupPage'
import StockSetupPage from './components/StockSetupPage'
import UserSetupPage from './components/UserSetupPage'
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Route exact path = "/yadashop" component = {HomePage}/>
      <Route path="/AdminPage" component = {AdminPage}/>
      <Route path="/OrderSetupPage" component = {OrderSetupPage}/>
      <Route path="/StockSetupPage" component = {StockSetupPage}/>
      <Route path="/UserSetupPage" component = {UserSetupPage}/>
    </BrowserRouter>
  );
}

export default App;

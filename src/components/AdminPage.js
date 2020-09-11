import React, { useState, Component } from 'react';
import { userCollection } from '../firebase'
import '../css/AdminPage.css';

export default function AdminPage(){
    const [lists , setLists] = useState([])
    const [condition , setCondition] = useState("")

    const userAction = (e) => {
        setCondition("User")
    }

    const stockAction = (e) => {
        setCondition("Stock")
    }
    //User
    if(condition == "User"){
        //open database user
        return (
            <div>
                <header class="header-admin">
	                <div class="brand-box">
		                <span class="brand">Admin</span>
	                </div>
	                <div class="text-box">
		                <h1 class="heading-primary">
		    	            <span class="heading-primary-main">Management</span>
		    	            <span class="heading-primary-sub">User</span>
                            <a href="#" class="btn btn-white btn-animated">Add</a>
                            <a href="#" class="btn btn-white btn-animated">Update</a>
		                </h1>
		                <a href="#" class="btn btn-white btn-animated" onClick = {userAction}>User</a>
                        <a href="#" class="btn btn-white btn-animated" onClick = {stockAction}>Stock</a>
                        <a href="/" class="btn btn-white btn-animated">Logout</a>
	                </div>
                </header>
            </div>
        )
    }
    //Stock
    if(condition == "Stock"){
        //open database stock
        return (
            <div>
                <header class="header-admin">
	                <div class="brand-box">
		                <span class="brand">Admin</span>
	                </div>
	                <div class="text-box">
		                <h1 class="heading-primary">
		    	            <span class="heading-primary-main">Management</span>
		    	            <span class="heading-primary-sub">Stock</span>
                            <a href="#" class="btn btn-white btn-animated">Add</a>
                            <a href="#" class="btn btn-white btn-animated">Update</a>
		                </h1>
		                <a href="#" class="btn btn-white btn-animated" onClick = {userAction}>User</a>
                        <a href="#" class="btn btn-white btn-animated" onClick = {stockAction}>Stock</a>
                        <a href="/" class="btn btn-white btn-animated">Logout</a>
	                </div>
                </header>
            </div>
        )
    }
    //Main
    return (
        <div>
            <header class="header-admin">
	            <div class="brand-box">
		            <span class="brand">Admin</span>
	            </div>
	
	            <div class="text-box">
		            <h1 class="heading-primary">
                        <span class="heading-primary-main">Management</span>
			            <span class="heading-primary-sub">Please select</span>
		            </h1>
		            <a href="#" class="btn btn-white btn-animated" onClick = {userAction}>User</a>
                    <a href="#" class="btn btn-white btn-animated" onClick = {stockAction}>Stock</a>
                    <a href="/" class="btn btn-white btn-animated">Logout</a>
	            </div>
            </header>
        </div>
    );
}
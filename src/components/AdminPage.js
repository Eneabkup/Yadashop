import React, { useState } from 'react';
import { userCollection , equipmentCollection} from '../firebase'
import '../css/AdminPage.css';

export default function AdminPage(){
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [nameUser , setNameUser] = useState("")

    
    const [nameEquipment , setNameEquipment] = useState("")
    const [amount , setAmount] = useState("")
    const [price , setPrice] = useState("")
    const [status , setStatus] = useState(false)


    const [condition , setCondition] = useState("")


     // database user
    const setUsers = (e) => {
        if(username == "" || password == "" || nameUser == ""){
            window.alert("Please try again")
            return false
        }
        userCollection.doc(username).set({
            password: password,
            name: nameUser
        });
        setUsername("")
        setPassword("")
        setNameUser("")
        window.alert("Success")
        return true
    }

    // database equipment
    const setEquipment = (e) => {
        if(nameEquipment == "" || amount == "" || price == "" || isNaN(parseInt(amount)) || isNaN(parseFloat(price))){
            window.alert("Please try again")
            setNameEquipment("")
            setAmount("")
            setPrice("")
            setStatus(false)
            return false
        }
        setStatus(false)
        if(amount > 0){
            setStatus(true)
        }
        equipmentCollection.doc(nameEquipment).set({
            amount : parseInt(amount),
            price : parseFloat(price),
            status : status
        });
        setNameEquipment("")
        setAmount("")
        setPrice("")
        setStatus(false)
        return true
    }

    const userAction = (e) => {
        setCondition("User")
    }

    const stockAction = (e) => {
        setCondition("Stock")
    }
    //User
    if(condition == "User"){
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
                            <form>
                                <input type="text" class="form_user" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required=""/>
                                <input type="password" class="form_user" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
                                <input type="text" class="form_user" id="Name" placeholder="Name" value={nameUser} onChange={(e) => setNameUser(e.target.value)} required=""/>
                                <div><a href="#" class="btn btn-white btn-animated" onClick = {setUsers}>Add/Update</a></div>
                            </form>
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
                            <form>
                                <input type="text" class="form_stock" id="Name" placeholder="Name" value={nameEquipment} onChange={(e) => setNameEquipment(e.target.value)} required=""/>
                                <input type="text" class="form_stock" id="Price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required=""/>
                                <input type="text" class="form_stock" id="Amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required=""/>
                                <div><a href="#" class="btn btn-white btn-animated" onClick = {setEquipment}>Add/Update</a></div>
                            </form>
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
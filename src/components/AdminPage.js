import React, { useState } from 'react';
import { userCollection , equipmentCollection} from '../firebase'
import '../css/AdminPage.css';

export default function AdminPage(){
    
    //set database user
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [nameUser , setNameUser] = useState("")

    const setUsers = () => {
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




    //set database equipment
    const [nameEquipment , setNameEquipment] = useState("")
    const [amount , setAmount] = useState("")
    const [price , setPrice] = useState("")
    const [status , setStatus] = useState(false)

    const setEquipment = () => {
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


    //read data
    const [lists , setLists] = useState([])

    const readUser = () => {
        const tmpLists = []
        userCollection.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const taskformat = {
                    username : doc.id,
                    password : doc.data().password,
                    name : doc.data().name
                }
                tmpLists.push(taskformat)
            });
        });
        setLists(tmpLists)
    }

    const readStock = () => {
        const tmpLists = []
        equipmentCollection.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const taskformat = {
                    name : doc.id,
                    amount : doc.data().amount,
                    price : doc.data().price,
                    status : doc.data().status
                }
                tmpLists.push(taskformat)
            });
        });
        setLists(tmpLists)
    }



    //set page
    const [condition , setCondition] = useState("")

    const userAction = () => {
        setCondition("User")
    }

    const stockAction = () => {
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
		                </h1>
                        <a>test</a>
                        <h1>
                            <form>
                                <input type="text" class="input-admin" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required=""/>
                                <input type="password" class="input-admin" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
                                <input type="text" class="input-admin" id="Name" placeholder="Name" value={nameUser} onChange={(e) => setNameUser(e.target.value)} required=""/>
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
		                </h1>
                            <a>sdfasdf</a>
                        <h1>
                            <form>
                                <input type="text" class="input-admin" id="Name" placeholder="Name" value={nameEquipment} onChange={(e) => setNameEquipment(e.target.value)} required=""/>
                                <input type="text" class="input-admin" id="Price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required=""/>
                                <input type="text" class="input-admin" id="Amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required=""/>
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
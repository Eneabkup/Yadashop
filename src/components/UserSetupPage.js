import React, { useState } from 'react';
import { userCollection } from '../firebase'
import '../css/AdminPage.css';

export default function UserSetupPage(){

    //set database user
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [nameUser , setNameUser] = useState("")

    const setUsers = (e) => {
        e.preventDefault()
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
    
    const [lists , setLists] = useState([])


    const readUser = (e) => {
        e.preventDefault()
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

    const deleteItem = (e) =>{

    }

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
                    <div>
                        <a href="/UserSetupPage" class="btn btn-white btn-animated" onClick={readUser}>Get User</a>
                        <a href="#" class="btn btn-white btn-animated">Get User</a>
                    </div>
                    <div>

                    </div>
                    <div>
                    {
                        lists.map((Item) => {
                            return(
                                <div>
                                    <a>{Item.username}</a>
                                    <a>{Item.password}</a>
                                    <a>{Item.name}</a>
                                    <button>delete</button>
                                </div>
                            )
                        })
                    }
                    </div>
                    <h1>
                        <input type="text" class="input-admin" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required=""/>
                        <input type="password" class="input-admin" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
                        <input type="text" class="input-admin" id="Name" placeholder="Name" value={nameUser} onChange={(e) => setNameUser(e.target.value)} required=""/>
                        <div><a href="#" class="btn btn-white btn-animated" onClick = {setUsers}>Add/Update</a></div>
                    </h1>
                    <a href="/UserSetupPage" class="btn btn-white btn-animated">User</a>
                    <a href="/StockSetupPage" class="btn btn-white btn-animated">Stock</a>
                    <a href="/OrderSetupPage" class="btn btn-white btn-animated">Order</a>
                    <a href="/" class="btn btn-white btn-animated">Logout</a>
                </div>
            </header>
        </div>
    )
}
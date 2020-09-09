import React, { useState, Component } from 'react';
import { userCollection } from '../firebase'
import { Link } from "react-router-dom";

export default function HomePage(){
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

    const [lists , setLists] = useState([])
    
    

    const login = (e) => {
        e.preventDefault()
        var user = {username : "test", password : "1234", name : "nana"};
        if(username == user.username){
            setUsername("YYY")
            setPassword("YYY")
        }else{
            setUsername("XXX")
            setPassword("XXX")
        }

        /*userCollection.doc("GDzlo9si8rB0tyXE8mJk").set({
            name: "Los Angeles",
            username: "CA",
            password: "USA"
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });*/
    }

    return (
        <div>
            <header>
            <form onSubmit= {login}>
                <input type="text" class="form_user" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required=""/>
                <input type="text" class="form_pass" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
                <button type="submit" class="form_login">Login</button>
            </form>
            </header>
  
        </div>
    );
}

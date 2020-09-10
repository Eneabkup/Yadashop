import React, { useState, Component } from 'react';
import { userCollection } from '../firebase'
import { Link } from "react-router-dom";

import '../css/HomePage.css';

export default function HomePage(){

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

    const login = (e) => {
        e.preventDefault()
        if(username == '' || password == ''){
            window.alert("Please try again");
        }else{
            userCollection.doc(username)
            .get()
            .then(function(doc) {
            if (doc.exists) {
                if(password == doc.data().password){
                    return true
                }
                window.alert("invalid password");
            } else {
                window.alert("invalid username");
            }
            }).catch(function(error) {
                window.alert(error);
            })
        }
        return false
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
            <header class="header">
                <form onSubmit={login}>
                    <input type="text" class="form_user" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required=""/>
                    <input type="password" class="form_pass" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
                    <button type="submit" class="form_login">Login</button>
                </form>
            </header>
            <body class="body">
                body
            </body>
            <footer class="footer">
                footer
            </footer>
        </div>
    );
}

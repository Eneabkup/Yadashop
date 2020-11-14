import React, { useState } from 'react';
import { employee , product , firebase } from '../firebase'
import { Redirect } from "react-router-dom";

import '../css/main.css';

export default function HomePage(){
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [redirect , setRedirect] = useState(false)
    const [lists , setLists] = useState([])

    const login = (e) => {
        if(username == '' || password == ''){
            window.alert("Please try again");
        }else{
            employee.doc(username)
            .get()
            .then(function(doc) {
            if (doc.exists) {
                if(password == doc.data().password){
                    setUsername("")
                    setPassword("")
                    setRedirect(true)
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
        setUsername("")
        setPassword("")
        setRedirect(false)
        return false
    }

    const [mounted, setMounted] = useState(false)

    if(!mounted){
        setMounted(true)
        const tmpLists = []
        product.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const taskformat = {
                    productID: doc.id,
                    name: doc.data().name,
                    weight: doc.data().weight,
                    price: doc.data().price,
                    amount: doc.data().amount,
                    image: doc.data().image,
                    url: ""
                }
                const ref = firebase.storage().ref("/" + doc.data().image)
                ref.getDownloadURL().then(function(url){
                    taskformat.url = url
                })
                tmpLists.push(taskformat)
            });
        });
        setTimeout(function(){
            setLists(tmpLists)
        }, 500);
    }
    
    if(redirect){
        return <Redirect to="/AdminPage"/>
    }else{
        return (
            <div>
                <header class="header">
                    <a><input type="text" class="input" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required=""/></a>
                    <a><input type="password" class="input" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/></a>
                    <a href="#" class="btn btn-white btn-animated" onClick = {login}>Login</a>
                </header>
                <br></br>
                <body class="body">
                    {
                        lists.map((Item) => {
                            return(
                                <a href="/EmployeeSetupPage" class="btn btn-white btn-animated" key={Item.productID} >
                                    <br></br>
                                    <br></br>
                                    <img src={Item.url} width="200" height="200"/>
                                    <div class="container">
                                        <h4><b>{Item.name}</b></h4> 
                                        <p>{Item.price + " Bath"}</p> 
                                    </div>
                                    <br></br>
                                    <br></br>
                                </a>
                            )
                        })
                    }
                </body>
            </div>
        );
    }
}

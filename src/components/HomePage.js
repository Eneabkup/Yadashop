import React, { useState } from 'react';
import { employee , product} from '../firebase'
import { Redirect } from "react-router-dom";
import '../css/main.css';

import BasketPage from '../components/BasketPage'
import CheckOrderPage from '../components/CheckOrderPage'

export default function HomePage(){
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [orderChecking , setOrderChecking] = useState("")
    const [basket , setBasket] = useState("https://firebasestorage.googleapis.com/v0/b/yadashop-3e07d.appspot.com/o/NullBasket.png?alt=media&token=16cf96ee-e22f-4ba0-b628-4b7a3c0fc341")
    
    const [signin , setSignin] = useState(false)
    const [basketDetail , setBasketDetail] = useState(false)
    const [checking , setChecking] = useState(false)

    const [listsBasket , setListsBasket] = useState([])
    const [lists , setLists] = useState([])

    const [mounted, setMounted] = useState(false)

    if(!mounted){
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
                    image: doc.data().image
                }
                if(doc.data().amount > 0){
                    tmpLists.push(taskformat)
                }
            })
            setLists(tmpLists) 
        }); 
        setMounted(true);  
    }
    
    const addItem = (e) => {
        setBasket("https://firebasestorage.googleapis.com/v0/b/yadashop-3e07d.appspot.com/o/Basket.jpg?alt=media&token=45516853-f05e-4925-a86d-2de4286844e5")
        console.log(e)
        console.log(listsBasket.includes(e))
        if(!listsBasket.includes(e)){
            listsBasket.push(e)
            setListsBasket(listsBasket)
            window.alert("Add Product");
        }else{
            window.alert("Available in your basket");
        }
        
    } 

    const login = () => {
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
                    setSignin(true)
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
        setSignin(false)
        return false
    }
    
    const checkOrder = () => {
        setChecking(true)
    }

    const getBasket = () => {
        setBasketDetail(true)
    }
    

    if(signin){
        return <Redirect to="/EmployeeSetupPage"/>
    }else if(checking){
        return <CheckOrderPage></CheckOrderPage>
    }else if(basketDetail){
        return <BasketPage></BasketPage>
    }else{
        return (
            <div>
                <header class="header">
                    <div align="left">
                        <a><input type="text" class="login" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required=""/></a>
                        <a><input type="password" class="login" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/></a>
                        <a href="#" class="btn btn-white btn-animated" onClick = {login}>Login</a>
                    </div>
                    <br></br>
                    <br></br>
                    <div align="center">
                        <a><input type="text" class="search" id="Username" placeholder="Order Number" value={orderChecking} onChange={(e) => setOrderChecking(e.target.value)} required=""/></a>
                        <a href="#" class="btn btn-blue btn-animated" onClick={checkOrder}>Check</a>
                        <a href="#" class="btn btn-while btn-animated" onClick={getBasket}><img src={basket} width="30" height="30"/></a>
                    </div>
                </header>
                <br></br>
                <body class="body">
                    {
                        lists.map((Item) => {
                            return(
                                <a href="#" class="btn btn-white btn-animated" onClick={() => addItem(Item.productID)}>
                                    <br></br>
                                    <br></br>
                                    <img src={Item.image} width="200" height="200"/>
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

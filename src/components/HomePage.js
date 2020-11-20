import React, { useState } from 'react';
import { employee , product , order} from '../firebase'
import { Redirect } from "react-router-dom";
import '../css/main.css';

import BasketPage from '../components/BasketPage'
import CheckOrderPage from '../components/CheckOrderPage'

export default function HomePage(){
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [admin, setAdmin] = useState(false)
    const [signin , setSignin] = useState(false)

    const [orderNumber , setOrderNumber] = useState("")
    const [checking , setChecking] = useState(false)

    const [basket , setBasket] = useState("https://firebasestorage.googleapis.com/v0/b/yadashop-3e07d.appspot.com/o/NullBasket.png?alt=media&token=16cf96ee-e22f-4ba0-b628-4b7a3c0fc341")
    const [basketDetail , setBasketDetail] = useState(false)
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
        if(window.confirm("Add Product")){
            setBasket("https://firebasestorage.googleapis.com/v0/b/yadashop-3e07d.appspot.com/o/Basket.jpg?alt=media&token=45516853-f05e-4925-a86d-2de4286844e5")
            if(!listsBasket.includes(e)){
                listsBasket.push(e)
                console.log(e)
                setListsBasket(listsBasket)
            }
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
        if(orderNumber == ""){
            window.alert("Please enter your order number");
        }else{
            order.doc(orderNumber)
            .get()
            .then(function(doc) {
                if(doc.exists){
                    setChecking(true)
                }else{
                    setOrderNumber("")
                    window.alert("invalid order number");  
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    const getBasket = () => {
        if(listsBasket.length != 0){
            setBasketDetail(true)
        }else{
            window.alert("Plese add your product");  
        }   
    }

    const switchVersion = () => {
        setAdmin(!admin)
    }
    

    if(signin){
        return <Redirect to="/EmployeeSetupPage"/>
    }else if(checking){
        return <CheckOrderPage orderNumber={orderNumber}></CheckOrderPage>
    }else if(basketDetail){
        return <BasketPage listsBasket={listsBasket} test={"test"} ></BasketPage>
    }else if(admin){
        return(
        <body>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div align="center">
                    <h1 class="heading-primary">
                        <span class="heading-primary-sub">Admin</span>
                    </h1>
                </div>
                <div align="center">
                    <br></br>
                    <input type="text" class="login" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required=""/>
                    <br></br>
                    <input type="password" class="login" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
                    <br></br>
                    <a href="#" class="btn btn-white btn-animated" onClick = {switchVersion}>Back</a>
                    <a href="#" class="btn btn-white btn-animated" onClick = {login}>Login</a>
                </div>
        </body>);
    }else{
        return (
            <div>
                <header class="header">
                    <br></br>
                    <div align="right">
                        <a href="#" class="btn btn-white btn-animated" onClick={switchVersion}>Admin Version</a>
                        <a href="/BillPage" class="btn btn-white btn-animated" >My Bill</a>
                        <a href="#" class="btn btn-while btn-animated" onClick={getBasket}><img src={basket} width="30" height="30"/></a>
                    </div>
                    <br></br>
                    <div align="center">
                        <h1 class="heading-primary">
                            <span class="heading-primary-sub">Check Your Order</span>
                        </h1>
                        <a ><input type="text" class="search" id="orderChecking" placeholder="Order Number" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} required=""/></a>
                        <a href="#" class="btn btn-white btn-animated" onClick={checkOrder}>Get</a>
                    </div>
                    <br></br>
                    <br></br>
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


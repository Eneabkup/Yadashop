import React, { useState } from 'react';
import { order , bill , detail , customer} from '../firebase'
import '../css/main.css';


export default function BillPage(){
    const [identityNumber , setIdentityNumber] = useState("")
    const [orderID , setOrderID] = useState("")
    const [data , setDate] = useState("")
    const [customerName , setCustomerName] = useState("")

    const [lists , setLists] = useState([])
    const [total , setTotal] = useState(0)

    const [haveBill , setHaveBill] = useState(false)

    const get = () => {
        if(identityNumber == "" || orderID == ""){
            window.alert("Please try again")
            clearValue()
        }else{
            order.doc(orderID)
            .get()
            .then(function(doc) {
            if (doc.exists) {
                if(identityNumber == doc.data().customerID){
                    if(doc.data().status == "Packed"){
                        getDetail()
                        setHaveBill(true)
                    }else{
                        window.alert("this order has not been confirmed");
                    }
                }else {
                    window.alert("invalid identity number");
                }
            } else {
                window.alert("invalid order number");
            }
            }).catch(function(error) {
                window.alert(error);
            })
        }

    }

    const getDetail = () => {
        var tmpTotal = 0
        const tmpLists = []
        detail.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    const taskformat = {
                        id : doc.id,
                        name : doc.data().name,
                        amount : doc.data().amount,
                        orderID : doc.data().orderID,
                        price : doc.data().price,
                        productID : doc.data().productID
                    }
                    if(taskformat.orderID == orderID){
                        tmpTotal += taskformat.price * taskformat.amount
                        tmpLists.push(taskformat)
                    }
            });
            setTotal(total + tmpTotal)
            setLists(tmpLists)
        });

        bill.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(doc.data().orderID == orderID){
                    setDate(doc.data().date)
                }
            });
        });

        customer.doc(identityNumber).get()
            .then(function(doc) {
                setCustomerName(doc.data().name)
        })
    }

    const clearValue = () =>{
        setIdentityNumber("")
        setOrderID("")
    }

    if(haveBill){
        return (
            <div>
                <body class="body">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div align="center">
                        <span class="heading-primary-main">YadaShop</span>
                        <br></br>
                        <td>Order Number : {orderID}</td>
                        <br></br>
                        <td>Date : {data}</td>
                        <br></br>
                        <td>Customer Name : {customerName}</td>
                        <br></br>
                        <br></br>
                    </div>
                    <center>
                        <table>
                                <tr>
                                    <td>Product</td>
                                    <td>Price</td>
                                    <td>Amount</td>
                                    <td>Total</td>
                                </tr>
                                {
                                lists.map((Item) => {
                                    return(
                                        <tr key={Item.id}>
                                            <td>{Item.name}</td>
                                            <td>{Item.price}</td>
                                            <td>{Item.amount}</td>
                                            <td>{Item.amount * Item.price} </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                        <h1 class="heading-primary">
                        <span class="heading-primary-sub">Total : {total}</span>
                         </h1>
                </center>
                    <br></br>
                    <div class="text-box">
                        <a href="/" class="btn btn-white btn-animated">Back</a>
                    </div>
                </body>
            </div>
        );
    }else{
        return (
            <div>
                <body class="body">
                    <center>
                        <h1 class="heading-primary">
                            <span class="heading-primary-main">My  Bill</span>
                        </h1>
                    </center>
                    <div align="center">
                        <br></br>
                        <input type="test" class="login" id="OrderID" placeholder="Order Number" value={orderID} onChange={(e) => setOrderID(e.target.value)} required=""/>
                        <br></br>
                        <input type="text" class="login" id="IdentityNumber" placeholder="Identity number" value={identityNumber} onChange={(e) => setIdentityNumber(e.target.value)} required=""/>
                        <br></br>
                        <a href="#" class="btn btn-white btn-animated" onClick = {get}>Get</a>
                    </div>
                    <br></br>
                    <br></br>
                    <div class="text-box">
                        <a href="/" class="btn btn-white btn-animated">Back</a>
                    </div>
                </body>
            </div>
        );
    }
}
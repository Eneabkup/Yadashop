import React, { useState } from 'react';
import { order , customer , detail ,  product} from '../firebase'
import { Redirect } from "react-router-dom";
import '../css/main.css';


export default function BasketPage(props){
    const [id , setID] = useState(props.customerID)
    const [address , setAddress] = useState("")
    const [email , setEmail] = useState("")
    const [name , setName] = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")

    const [lists , setlists]  = useState(props.listsItem)

    const [total , setTotal] = useState(0)

    const [mounted, setMounted] = useState(false)

    if(!mounted){
        customer.doc(id)
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    setAddress(doc.data().address)
                    setEmail(doc.data().email)
                    setName(doc.data().name)
                    setPhoneNumber(doc.data().phoneNumber)
                }
            }).catch(function(error) {
                window.alert(error);
            })
        setMounted(true)
        var tmpTotal = 0
        lists.forEach(function(Item){
            tmpTotal += Item.Data.price * Item.PurchaseAmount
        })
        setTotal(total + tmpTotal)
    }
    

    const ConfirmOrder = () => {
        if(id == "" || address == "" || email == "" || name == "" || phoneNumber == ""){
            window.alert("Plese try again")
        }else{
            var date = new Date();
            customer.doc(id).set({
                address: address,
                email: email,
                name: name,
                phoneNumber: phoneNumber
            }).then(function(){
                order.add({
                    customerID: id,
                    date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
                    status: "Not paid"
                }).then(function(doc){
                    lists.forEach(function(Item){
                        product.doc(Item.Data.productID).set({
                            amount: Item.NewAmount,
                            image: Item.Data.image,
                            name: Item.Data.name,
                            price: Item.Data.price,
                            weight: Item.Data.weight
                        })
                        detail.doc().set({
                            amount: Item.PurchaseAmount,
                            orderID: doc.id,
                            price: Item.Data.price,
                            productID: Item.Data.productID
                        })
                    })
                    window.alert("Success! Order number is " + doc.id)
                    window.location.reload()
                })
            })
        }
    }




    return (
        <div>
            <body class="body">
                <center>
                    <h1 class="heading-primary">
                        <span class="heading-primary-main">My Basket</span>
                    </h1>
                </center>
                    <table>
                            <tr>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Purchase amount</th>
                              <th>Total</th>                         
                            </tr>
                            {
                            lists.map((Item) => {
                                return(
                                    <tr key={Item.Data.productID}>
                                        <img src={Item.Data.image} width="100" height="100" />
                                        <td>{Item.Data.name}</td>
                                        <td>{Item.Data.price}</td>
                                        <td>{Item.PurchaseAmount}</td>
                                        <td>{Item.Data.price * Item.PurchaseAmount}</td>
                                    </tr>
                                )
                            })
                            }
                    </table>
                    <h1 class="heading-primary">
                        <span class="heading-primary-sub">Total : {total}</span>
                    </h1>
                    <h1>
                        <input type="text" class="input" id="IdentityNumber" placeholder="IdentityNumber" value={id} onChange={(e) => setID(e.target.value)} required=""/>
                        <br></br>
                        <br></br>
                        <input type="text" class="input" id="Address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required=""/>
                        <br></br>
                        <input type="text" class="input" id="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required=""/>
                        <br></br>
                        <input type="text" class="input" id="Name" placeholder="Name-Surname" value={name} onChange={(e) => setName(e.target.value)} required=""/>
                        <br></br>
                        <input type="text" class="input" id="Phonenumber" placeholder="Phonenumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required=""/>   
                    </h1>
                    <div class="text-box">
                        <a href="#" class="btn btn-white btn-animated" onClick={ConfirmOrder}>Confirm</a>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div class="text-box">
                        <a href="/" class="btn btn-white btn-animated">Back</a>
                    </div>
            </body>
        </div>
    );
}
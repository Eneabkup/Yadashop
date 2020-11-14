import React, { useState } from 'react';
import { order } from '../firebase'
import '../css/main.css';

import OrderDetailPage from '../components/OrderDetailPage'

export default function OrderSetupPage(){
    const [redirect , setRedirect] = useState(false)
    const [orderID , setOrderID] = useState("")
    const [lists , setLists] = useState([])

    const [mounted, setMounted] = useState(false)

    if(!mounted){
        setMounted(true)
        const tmpLists = []
        order.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const taskformat = {
                    id : doc.id,
                    customerID : doc.data().customerID,
                    date : doc.data().date,
                    status : doc.data().status
                }
                tmpLists.push(taskformat)
            });
        });
        setTimeout(function(){
            setLists(tmpLists)
        }, 500);
    }

    const nextPage = (e) => {
        setRedirect(true)
        setOrderID(e)
    }
    
    if(redirect){
        return <OrderDetailPage orderID={orderID}/>
    }else{
        return (
            <div>
                <body class="body">
                    <div class="brand-box">
                        <span class="brand">Admin</span>
                        <br></br>
                        <a href="/" class="btn btn-white btn-animated">Logout</a>
                    </div>
                    <center>
                        <h1 class="heading-primary">
                            <span class="heading-primary-main">Management</span>
                            <span class="heading-primary-sub">Order</span>
                        </h1>
                    </center>
                    <div class="text-box">
                        <a href="/EmployeeSetupPage" class="btn btn-white btn-animated">User</a>
                        <a href="/ProductSetupPage" class="btn btn-white btn-animated">Stock</a>
                        <a href="/OrderSetupPage" class="btn btn-white btn-animated">Order</a>
                        
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <center>
                        <table>
                                <tr>
                                  <th>OrderID</th>
                                  <th>CustomerID</th>
                                  <th>Date</th>
                                  <th>Status</th>
                                  <th>Get</th>
                                </tr>
                                {
                                lists.map((Item) => {
                                    return(
                                        <tr key={Item.id}>
                                            <td>{Item.id}</td>
                                            <td>{Item.customerID}</td>
                                            <td>{Item.date}</td>
                                            <td>{Item.status}</td>
                                            <td class="btn btn-green btn-animated"  onClick = {(e) => nextPage(Item.id)} >detail</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </center>
                    <br></br>
                    <br></br>
                    <br></br>
                </body>
            </div>
        )
    }
}
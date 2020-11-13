import React, { useState } from 'react';
import { order } from '../firebase'
import '../css/AdminPage.css';

export default function UserSetupPage(){

    const [lists , setLists] = useState([])

    const readOrder = (e) => {
        e.preventDefault()
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
            window.alert("Success")
        }, 500);
    }

    const getDetail = (e , f) =>{
        
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
                        <span class="heading-primary-sub">Order</span>
                        <a href="#" class="btn btn-white btn-animated" onClick={readOrder}>Get Order</a>
                    </h1>
                    <center>
                    <h5 class="heading-primary">
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
                                        <button  onClick={() => getDetail(Item.id,Item.customerID)}>Detail</button>
                                    </tr>
                                )
                            })
                        }
                        </table>
                    </h5>
                    </center>
                    <a href="/EmployeeSetupPage" class="btn btn-white btn-animated">User</a>
                    <a href="/ProductSetupPage" class="btn btn-white btn-animated">Stock</a>
                    <a href="/OrderSetupPage" class="btn btn-white btn-animated">Order</a>
                    <a href="/" class="btn btn-white btn-animated">Logout</a>
                </div>
            </header>
        </div>
    )
}
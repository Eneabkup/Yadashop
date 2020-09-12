import React, { useState } from 'react';
import { orderCollection } from '../firebase'
import '../css/AdminPage.css';

export default function UserSetupPage(){

    const [lists , setLists] = useState([])

    const readOrder = (e) => {
        e.preventDefault()
        const tmpLists = []
        orderCollection.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                var orderStatus = 'Pending'
                if(doc.data().status){
                    orderStatus = 'Done'
                }
                const taskformat = {
                    id : doc.id,
                    name : doc.data().name,
                    address : doc.data().address,
                    phone : doc.data().phone,
                    product : doc.data().product,
                    amount : doc.data().amount,
                    status : doc.data().status,
                    orderStatus : orderStatus
                }
                tmpLists.push(taskformat)
            });
        });
        
        setTimeout(function(){
            setLists(tmpLists)
            window.alert("Success")
        }, 500);
    }

    const updateItem = (e , s) =>{
        console.log(e,s)
        orderCollection.doc(e).set({
            name : s.name,
            address : s.address,
            phone : s.phone,
            product : s.product,
            amount : s.amount,
            status : !s.status
        });
        setTimeout(function(){
            window.alert("Update Success!")
            window.location.reload()
        }, 500);
    }

    const deleteItem = (e) =>{
        orderCollection.doc(e).delete()
        setTimeout(function(){
            window.alert("Delete Success!")
            window.location.reload()
        }, 500);
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
                              <th>Name</th>
                              <th>Address</th>
                              <th>Phone</th>
                              <th>Product</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Condition</th>
                            </tr>
                        {
                            lists.map((Item) => {
                                return(
                                    <tr key={Item.id}>
                                        <td>{Item.name}</td>
                                        <td>{Item.address}</td>
                                        <td>{Item.phone}</td>
                                        <td>{Item.product}</td>
                                        <td>{Item.amount}</td>
                                        <td>{Item.orderStatus}</td>
                                        <button  onClick={() => updateItem(Item.id,Item)}>update</button>
                                        <button  onClick={() => deleteItem(Item.id)}>delete</button>
                                    </tr>
                                )
                            })
                        }
                        </table>
                    </h5>
                    </center>
                    <a href="/UserSetupPage" class="btn btn-white btn-animated">User</a>
                    <a href="/StockSetupPage" class="btn btn-white btn-animated">Stock</a>
                    <a href="/OrderSetupPage" class="btn btn-white btn-animated">Order</a>
                    <a href="/" class="btn btn-white btn-animated">Logout</a>
                </div>
            </header>
        </div>
    )
}
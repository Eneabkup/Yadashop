import React , { useState } from 'react';
import { equipmentCollection } from '../firebase'
import '../css/AdminPage.css';

export default function StockSetupPage(){

    const [nameEquipment , setNameEquipment] = useState("")
    const [amount , setAmount] = useState("")
    const [price , setPrice] = useState("")
    const [status , setStatus] = useState(false)

    const setEquipment = (e) => {
        e.preventDefault()
        if(nameEquipment == "" || amount == "" || price == "" || isNaN(parseInt(amount)) || isNaN(parseFloat(price))){
            window.alert("Please try again")
            setNameEquipment("")
            setAmount("")
            setPrice("")
            setStatus(false)
            return false
        }
        setStatus(false)
        if(amount > 0){
            setStatus(true)
        }
        equipmentCollection.doc(nameEquipment).set({
            amount : parseInt(amount),
            price : parseFloat(price),
            status : status
        });
        setTimeout(function(){
            setNameEquipment("")
            setAmount("")
            setPrice("")
            setStatus(false)
            window.location.reload()
        }, 500);
        return true
    }

    const [lists , setLists] = useState([])

    const readEquipment = (e) => {
        e.preventDefault()
        const tmpLists = []
        equipmentCollection.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const taskformat = {
                    name : doc.id,
                    amount : doc.data().amount,
                    price : doc.data().price,
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

    const deleteItem = (e) =>{
        console.log(e)
        equipmentCollection.doc(e).delete()
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
                        <span class="heading-primary-sub">Stock</span>
                        <a href="#" class="btn btn-white btn-animated" onClick={readEquipment}>Get Stock</a>
                    </h1>
                    <center>
                    <h5 class="heading-primary">
                        <table>
                            <tr>
                              <th>Name</th>
                              <th>Amount</th>
                              <th>Price</th>
                              <th>Delete</th>
                            </tr>
                        {
                            lists.map((Item) => {
                                return(
                                    <tr key={Item.name}>
                                        <td>{Item.name}</td>
                                        <td>{Item.amount}</td>
                                        <td>{Item.price}</td>
                                        <button  onClick={() => deleteItem(Item.name)}>delete</button>
                                    </tr>
                                )
                            })
                        }
                        </table>
                    </h5>
                    </center>
                    <h1>
                        <form>
                            <input type="text" class="input-admin" id="Name" placeholder="Name" value={nameEquipment} onChange={(e) => setNameEquipment(e.target.value)} required=""/>
                            <input type="text" class="input-admin" id="Price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required=""/>
                            <input type="text" class="input-admin" id="Amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required=""/>
                            <div><a href="#" class="btn btn-white btn-animated" onClick = {setEquipment}>Add/Update</a></div>
                        </form>
                    </h1>
                    <a href="/UserSetupPage" class="btn btn-white btn-animated">User</a>
                    <a href="/StockSetupPage" class="btn btn-white btn-animated">Stock</a>
                    <a href="/OrderSetupPage" class="btn btn-white btn-animated">Order</a>
                    <a href="/" class="btn btn-white btn-animated">Logout</a>
                </div>
            </header>
        </div>
    )
}
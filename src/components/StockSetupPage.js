import React , { useState } from 'react';
import { equipmentCollection } from '../firebase'
import '../css/AdminPage.css';

export default function StockSetupPage(){

    const [nameEquipment , setNameEquipment] = useState("")
    const [amount , setAmount] = useState("")
    const [price , setPrice] = useState("")
    const [status , setStatus] = useState(false)

    const setEquipment = () => {
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
        setNameEquipment("")
        setAmount("")
        setPrice("")
        setStatus(false)
        return true
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
                        <a href="#" class="btn btn-white btn-animated">Get Stock</a>
                    </h1>
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
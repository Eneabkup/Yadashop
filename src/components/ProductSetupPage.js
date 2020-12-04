import React , { useState } from 'react';
import { product , firebase } from '../firebase'
import '../css/main.css';

import ReportPage from '../components/ReportPage'

export default function ProductSetupPage(){
    const [productID , setProductID] = useState("")
    const [name , setName] = useState("")
    const [weight , setWeight] = useState("")
    const [price , setPrice] = useState("")
    const [amount , setAmount] = useState("")
    const [size , setSize] = useState("")

    const [report, setReport] = useState(false)
    const [lists , setLists] = useState([])

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
                    size: doc.data().size,
                    price: doc.data().price,
                    amount: doc.data().amount,
                    image: doc.data().image,

                }
                tmpLists.push(taskformat)
            });
            setLists(tmpLists)
        });
    }

    const clearValue = () => {
        setProductID("")
        setWeight("")
        setPrice("")
        setAmount("")
        setName("")
        setSize("")
        window.location.reload()
    }

    const setProduct = (e) => {
        e.preventDefault()
        if(name == "" || weight == "" || price == "" || amount == "" || size){
            window.alert("Please try again")
            clearValue()
        }else if(isNaN(parseInt(weight) || isNaN(parseFloat(price)) || isNaN(parseInt(amount)))){
            window.alert("Please check format weight price and amount again!")
            clearValue()
        }else if(parseInt(weight) < 1 || parseFloat(price) < 1 || parseInt(amount) < 1){
            window.alert("Invalid number!")
            clearValue()
        }else if(typeof document.querySelector("#photo").files[0] == 'undefined'){
            window.alert("Please upload product image")
            clearValue()
        }else if(window.confirm("Confirm")){
            const ref = firebase.storage().ref();
            const file = document.querySelector("#photo").files[0];
            const imageName = file.name
            const metadata = {
                contentType: file.type
            };

            const task = ref.child(imageName).put(file, metadata);
            task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                product.doc(productID).set({
                    name: name,
                    weight: parseInt(weight),
                    size: size,
                    price: parseFloat(price),
                    amount: parseInt(amount),
                    image: url
                }).then(function(){    
                    window.alert("Success")
                    clearValue()
                });
            })
        }else{
            clearValue()
        }
    }

    const getReport = () => {
        setReport(true)
    }

    const deleteItem = (e) =>{
        if(window.confirm("Confirm")){
            product.doc(e).delete().then(function(){    
                window.alert("Delete Success!")
                clearValue()
            });
        }
    }

    if(report){
        return ( <ReportPage lists={lists}></ReportPage>)
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
                            <span class="heading-primary-sub">Stock</span>
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
                                  <th>Image</th>
                                  <th>ID</th>
                                  <th>Name</th>
                                  <th>Weight</th>
                                  <th>Size</th>
                                  <th>Price</th>
                                  <th>Amount</th>
                                  <th>Delete</th>
                                </tr>
                                {
                                lists.map((Item) => {
                                    return(
                                        <tr key={Item.productID}>
                                            <img src={Item.image} width="100" height="100" />
                                            <td>{Item.productID}</td>
                                            <td>{Item.name}</td>
                                            <td>{Item.weight}</td>
                                            <td>{Item.size}</td>
                                            <td>{Item.price}</td>
                                            <td>{Item.amount}</td>
                                            <td class="btn btn-red btn-animated" onClick={() => deleteItem(Item.productID)}>delete</td>
                                        </tr>
                                    )
                                })
                                }
                        </table>
                    </center>
                    <br></br>
                    <br></br>
                    <div><a href="#" class="btn btn-white btn-animated" onClick = {getReport}>Get Report</a></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1>
                        <form>
                            <input type="text" class="input" id="ProductID" placeholder="ProductID" value={productID} onChange={(e) => setProductID(e.target.value)} required=""/>
                            <br></br>
                            <input type="text" class="input" id="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required=""/>
                            <br></br>
                            <input type="text" class="input" id="Weight" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} required=""/>
                            <br></br>
                            <input type="text" class="input" id="Size" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} required=""/>
                            <br></br>
                            <input type="text" class="input" id="Price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required=""/>
                            <br></br>
                            <input type="text" class="input" id="Amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required=""/>
                            <br></br>
                            <input type="file" class="input" id="photo"/>
                            <div><a href="#" class="btn btn-white btn-animated" onClick = {setProduct}>Add/Update</a></div>
                        </form>
                    </h1>
                </body>
            </div>
        )
    }
}
import React , { useState } from 'react';
import { product , firebase } from '../firebase'
import '../css/AdminPage.css';

export default function ProductSetupPage(){
    const [productID , setProductID] = useState("")
    const [name , setName] = useState("")
    const [weight , setWeight] = useState("")
    const [price , setPrice] = useState("")
    const [amount , setAmount] = useState("")
    const [image , setImage] = useState("")
    

    const setProduct = (e) => {
        e.preventDefault()
        const text = ""
        if(name == "" || weight == "" || price == "" || amount == ""){
            window.alert("Please try again")
        }else if(isNaN(parseInt(weight) || isNaN(parseFloat(price)) || isNaN(parseInt(amount)))){
            window.alert("Please check format weight price and amount again!")
        }else if(isNaN(document.querySelector("#photo").files[0])){
            window.alert("Please upload product image")
        }else{
            const ref = firebase.storage().ref();
            const file = document.querySelector("#photo").files[0];
            const imageName = file.name
            const metadata = {
            contentType: file.type
            };
            const task = ref.child(imageName).put(file, metadata);
            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log(url);
                const image = document.querySelector("#image").src = url;
                image.src = url 
            })
            .catch(console.error);

            product.doc(productID).set({
                name: name,
                weight: parseInt(weight),
                price: parseFloat(price),
                amount: parseInt(amount),
                image: imageName
            });
            window.alert("Success")
        }
        setTimeout(function(){
            setProductID("")
            setWeight("")
            setPrice("")
            setAmount("")
            setImage("")
            setName("")
            window.location.reload()
        }, 500);
    }

    const [lists , setLists] = useState([])

    const readProduct = (e) => {
        e.preventDefault()
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
                tmpLists.push(taskformat)
            });
        });
        
        setTimeout(function(){
            setLists(tmpLists)
            window.alert("Success")
        }, 500);
    }


    const deleteItem = (e) =>{
        product.doc(e).delete()
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
                        <a href="#" class="btn btn-white btn-animated" onClick={readProduct}>Get Stock</a>
                    </h1>
                    <center>
                    <h5 class="heading-primary">
                        <table>
                            <tr>

                              <th>ID</th>
                              <th>Name</th>
                              <th>Weight</th>
                              <th>Price</th>
                              <th>Amount</th>
                              <th>Delete</th>
                            </tr>
                        {
                            lists.map((Item) => {
                                return(
                                    <tr key={Item.productID}>

                                        <td>{Item.productID}</td>
                                        <td>{Item.name}</td>
                                        <td>{Item.weight}</td>
                                        <td>{Item.price}</td>
                                        <td>{Item.amount}</td>
                                        <button  onClick={() => deleteItem(Item.productID)}>delete</button>
                                    </tr>
                                )
                            })
                        }
                        </table>
                    </h5>
                    </center>
                    <h1>
                        <form>
                            <input type="text" class="input-admin" id="ProductID" placeholder="ProductID" value={productID} onChange={(e) => setProductID(e.target.value)} required=""/>
                            <input type="text" class="input-admin" id="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required=""/>
                            <input type="text" class="input-admin" id="Weight" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} required=""/>
                            <input type="text" class="input-admin" id="Price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required=""/>
                            <input type="text" class="input-admin" id="Amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required=""/>
                            <input type="file" class="input-admin" id="photo"/>
                            <div><a href="#" class="btn btn-white btn-animated" onClick = {setProduct}>Add/Update</a></div>
                        </form>
                    </h1>
                    <a href="/EmployeeSetupPage" class="btn btn-white btn-animated">User</a>
                    <a href="/ProductSetupPage" class="btn btn-white btn-animated">Stock</a>
                    <a href="/OrderSetupPage" class="btn btn-white btn-animated">Order</a>
                    <a href="/" class="btn btn-white btn-animated">Logout</a>
                </div>
            </header>
        </div>
    )
}
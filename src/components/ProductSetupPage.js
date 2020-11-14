import React , { useState } from 'react';
import { product , firebase } from '../firebase'
import '../css/main.css';

export default function ProductSetupPage(){
    const [productID , setProductID] = useState("")
    const [name , setName] = useState("")
    const [weight , setWeight] = useState("")
    const [price , setPrice] = useState("")
    const [amount , setAmount] = useState("")

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
                    price: doc.data().price,
                    amount: doc.data().amount,
                    image: doc.data().image,
                    url: ""
                }
                const ref = firebase.storage().ref("/" + doc.data().image)
                ref.getDownloadURL().then(function(url){
                    taskformat.url = url
                })
                tmpLists.push(taskformat)
            });
            setLists(tmpLists)
        });
    }

    

    const setProduct = (e) => {
        e.preventDefault()
        if(name == "" || weight == "" || price == "" || amount == ""){
            window.alert("Please try again")
        }else if(isNaN(parseInt(weight) || isNaN(parseFloat(price)) || isNaN(parseInt(amount)))){
            window.alert("Please check format weight price and amount again!")
        }else if(typeof document.querySelector("#photo").files[0] == 'undefined'){
            window.alert("Please upload product image")
        }else{
            const ref = firebase.storage().ref();
            const file = document.querySelector("#photo").files[0];
            const imageName = file.name
            const metadata = {
                contentType: file.type
            };
            ref.child(imageName).put(file, metadata);
            

            product.doc(productID).set({
                name: name,
                weight: parseInt(weight),
                price: parseFloat(price),
                amount: parseInt(amount),
                image: imageName
            }).then(function(){    
                setProductID("")
                setWeight("")
                setPrice("")
                setAmount("")
                setName("")
                window.alert("Success")
                window.location.reload()
            });
        }
    }


    const deleteItem = (e) =>{
        product.doc(e).delete().then(function(){    
            window.alert("Delete Success!")
            window.location.reload()
        });
    }

    
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
                              <th>Price</th>
                              <th>Amount</th>
                              <th>Delete</th>
                            </tr>
                            {
                            lists.map((Item) => {
                                return(
                                    <tr key={Item.productID}>
                                        <img src={Item.url} width="100" height="100" />
                                        <td>{Item.productID}</td>
                                        <td>{Item.name}</td>
                                        <td>{Item.weight}</td>
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
                <center>
                    <a href="#" class="btn btn-blue btn-animated">Refresh</a>
                </center>
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
import React, { useState } from 'react';
import { product } from '../firebase'
import { Redirect } from "react-router-dom";
import '../css/main.css';


export default function BasketPage(props){
    const [listsBasket , setListsBasket] = useState(props.listsBasket)

    const [lists , setlists] = useState([])
    const [total , setTotal] = useState(0)

    const [mounted, setMounted] = useState(false)

    if(!mounted){
        setMounted(true)
        const tmpLists = []
        var tmpTotal = 0
        product.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const taskformat = {
                    productID: doc.id,
                    name: doc.data().name,
                    weight: doc.data().weight,
                    price: doc.data().price,
                    amount: doc.data().amount,
                    PurchaseAmount: 1,
                    image: doc.data().image,
                }
                if(listsBasket.includes(taskformat.productID)){
                    tmpTotal += taskformat.price * taskformat.PurchaseAmount
                    tmpLists.push(taskformat)
                }
            });
            setTotal(total + tmpTotal)
            setlists(tmpLists)
        });
    }

    if(listsBasket.length == 0){
        return <Redirect to="/"/>
    }else{
        return (
            <div>
                <body class="body">
                    <center>
                        <h1 class="heading-primary">
                            <span class="heading-primary-main">Your Basket</span>
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
                                        <tr key={Item.productID}>
                                            <img src={Item.image} width="100" height="100" />
                                            <td>{Item.name}</td>
                                            <td>{Item.price}</td>
                                            <td>{Item.PurchaseAmount}</td>
                                            <td>{Item.price * Item.PurchaseAmount}</td>
                                        </tr>
                                    )
                                })
                                }
                        </table>
                        <h1 class="heading-primary">
                        <span class="heading-primary-sub">Total : {total}</span>
                         </h1>
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
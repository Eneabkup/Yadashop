import React, { useState } from 'react';
import {order , payment , firebase} from '../firebase'
import '../css/main.css';


export default function CheckOrderPage(props){
    const [customerID , setCustomID] = useState("")
    const [date , setDate ] = useState("")
    const [status , setStatus] = useState("")

    const [mounted, setMounted] = useState(false)

    if(!mounted){
        order.doc(props.orderNumber)
            .get()
            .then(function(doc) {
                setCustomID(doc.data().customerID)
                setDate(doc.data().date)
                setStatus(doc.data().status)
        }).catch(function(error) {
            console.log(error);
        });
        setMounted(true)
    }

    const addPayment = () => {
        if(status == "Packed"){
            window.alert("Plese try again!")
            window.location.reload()
        }else if(typeof document.querySelector("#photo").files[0] == 'undefined'){
            window.alert("Please upload image")
            
        }else{
            var dateNow = new Date();
            const ref = firebase.storage().ref();
            const file = document.querySelector("#photo").files[0];
            const imageName = file.name
            const metadata = {
                contentType: file.type
            };
            const task = ref.child(imageName).put(file, metadata);
            task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                payment.add({
                    date: dateNow.getDate() + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getFullYear(),
                    image: url,
                    orderID: props.orderNumber
                }).then(function(){
                    order.doc(props.orderNumber).set({
                        customerID: customerID,
                        date: date,
                        status: "Checking"
                    }).then(function (){
                        window.alert("Success!")
                        window.location.reload()
                    })
                })
            })
        }
        
    }

    
    return (
        <div>
            <body class="body">
                <center>
                    <h1 class="heading-primary">
                        <span class="heading-primary-main">Order</span>
                    </h1>
                </center>
                <center>
                    <table>
                        <tr>
                            <th>Order Number</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        <tr>
                            <td>{props.orderNumber}</td>
                            <td>{date}</td>
                            <td>{status}</td>
                        </tr>
                    </table>
                </center>
                <br></br>
                <br></br>
                <form>
                    <input type="file" class="input" id="photo"/>
                    <div><a href="#" class="btn btn-white btn-animated" onClick = {addPayment}>Add Payment</a></div>
                </form>
                <br></br>
                <br></br>
                <div class="text-box">
                    <a href="/" class="btn btn-white btn-animated">Back</a>
                </div>
            </body>
        </div>
        );
    }

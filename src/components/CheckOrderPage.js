import React, { useState } from 'react';
import { order } from '../firebase'
import '../css/main.css';


export default function CheckOrderPage(props){
    const [date , setDate ] = useState("")
    const [status , setStatus] = useState("")

    const [mounted, setMounted] = useState(false)

    if(!mounted){
        order.doc(props.orderNumber)
            .get()
            .then(function(doc) {
                setDate(doc.data().date)
                setStatus(doc.data().status)
        }).catch(function(error) {
            console.log(error);
        });
        setMounted(true)
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
                <div class="text-box">
                    <a href="/" class="btn btn-white btn-animated">Back</a>
                </div>
            </body>
        </div>
        );
    }

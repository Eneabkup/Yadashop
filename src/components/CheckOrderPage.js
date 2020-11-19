import React from 'react';
import '../css/main.css';


export default function CheckOrderPage(props){
    
    return (
        <div>
            <body class="body">
                <center>
                    <h1 class="heading-primary">
                        <span class="heading-primary-main">Order</span>
                        <span class="heading-primary-sub">{props.orderNumber}</span>
                    </h1>
                </center>
                <div class="text-box">
                    <a href="/" class="btn btn-white btn-animated">Back</a>
                </div>
            </body>
        </div>
    );
}
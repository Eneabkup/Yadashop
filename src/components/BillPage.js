import React, { useState } from 'react';
import { order , bill } from '../firebase'
import '../css/main.css';


export default function BillPage(){
    
    return (
        <div>
            <body class="body">
                <center>
                    <h1 class="heading-primary">
                        <span class="heading-primary-main">My  Bill</span>
                    </h1>
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
import React , { useState } from 'react';
import '../css/main.css';

export default function ReportPage(props){
    const [lists , setList] = useState(props.lists)
    const [date , setDate] = useState("")

    const [mounted, setMounted] = useState(false)

    if(!mounted){
        const date = new Date();
        setDate(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
        setMounted(true)
    }

    return (
        <div>
            <center>
                    <h1 class="heading-primary">
                        <span class="heading-primary-main">Report Stock</span>
                    </h1>
            </center>
            <br></br>
            <div>   
                    <span>Date : {date}</span>
                    <br></br>
                    <br></br>
                    <span>Company : YadaShop</span>
            </div>
            <br></br>
                    <br></br>
                    <center>
                        <table>
                                <tr>
                                  <td>ID</td>
                                  <td>Name</td>
                                  <td>Price</td>
                                  <td>Amount</td>
                                </tr>
                                {
                                lists.map((Item) => {
                                    return(
                                        <tr key={Item.productID}>
                                            <td>{Item.productID}</td>
                                            <td>{Item.name}</td>
                                            <td>{Item.price}</td>
                                            <td>{Item.amount}</td>
                                        </tr>
                                    )
                                })
                                }
                        </table>
                    </center>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div align="center">   
                        <span>___________________</span>
                        <br></br>
                        <br></br>
                        <span>Employee</span>
                    </div>
        </div>
    )
}
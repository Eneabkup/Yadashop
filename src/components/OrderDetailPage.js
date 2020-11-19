import React, { useState } from 'react';
import { order , customer , detail , payment , bill , firebase} from '../firebase'
import '../css/main.css';

export default function OrderDetailPage(props){
    const [date , setDate ] = useState("")
    const [status , setStatus] = useState("")
    

    const [customerName , setCustomerName] = useState("")
    const [customerAddress , setCustomerAddress] = useState("")
    const [customerEmail , setCustomerEmail] = useState("")
    const [customerPhone , setCustomerPhone] = useState("")

    const [lists , setLists] = useState([])
    const [total , setTotal] = useState(0)

    const [listsPayment , setListsPayment] = useState([])


    const [mounted, setMounted] = useState(false)

    if(!mounted){
        order.doc(props.orderID)
            .get()
            .then(function(doc) {
                setDate(doc.data().date)
                setStatus(doc.data().status)
        }).catch(function(error) {
            console.log(error);
        });

        customer.doc(props.customerID)
            .get()
            .then(function(doc) {
                setCustomerName(doc.data().name)
                setCustomerAddress(doc.data().address)
                setCustomerEmail(doc.data().email)
                setCustomerPhone(doc.data().phoneNumber)
        }).catch(function(error) {
            console.log(error);
        });

        const tmpLists = []
        detail.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const taskformat = {
                    id : doc.id,
                    amount : doc.data().amount,
                    orderID : doc.data().orderID,
                    price : doc.data().price,
                    productID : doc.data().productID
                }
                if(taskformat.orderID == props.orderID){
                    setTotal(total + taskformat.amount * taskformat.price)
                    tmpLists.push(taskformat)
                }
            });
            setLists(tmpLists)
        });

        const tmpListsPayment = []
        payment.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const taskformat = {
                    id : doc.id,
                    orderID : doc.data().orderID,
                    date : doc.data().date,
                    image : doc.data().image,
                    url : ""
                }
                const ref = firebase.storage().ref("/" + doc.data().image)
                ref.getDownloadURL().then(function(url){
                    taskformat.url = url
                })
                if(taskformat.orderID == props.orderID){
                    tmpListsPayment.push(taskformat)
                }
        });
        setListsPayment(tmpListsPayment)
    });
        setMounted(true)
    }

    const setBill = (e) => {
        if(setOrder(e)){
            var date = new Date();
            bill.doc().set({
                orderID : props.orderID,
                date : date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
                total : total
            }).then(function(){
                window.alert("Success")
                window.location.reload()
            });
        } 
    }

    const setOrder = (e) => {
        if(status == "Packed" || status == "Cancel" || (status == "Not paid" && e == "Packed")){
            window.alert("Please check the order detail again!")
            window.location.reload()
            return false
        }else if(window.confirm("Confirm")){
            order.doc(props.orderID).set({
                customerID : props.customerID,
                date : date,
                status : e
            }).then(function(){
                window.alert("Success")
                window.location.reload()
            });
        }
        return true
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
                        <span class="heading-primary-sub">Order Detail</span>
                    </h1>
                </center>
                <div class="text-box">
                    <a href="/EmployeeSetupPage" class="btn btn-white btn-animated">User</a>
                    <a href="/ProductSetupPage" class="btn btn-white btn-animated">Stock</a>
                    <a href="/OrderSetupPage" class="btn btn-white btn-animated">Order</a>
                </div>
                <br></br>
                <br></br>
                <h1 class="heading-primary">
                    <span class="heading-primary-sub">Order</span>
                </h1>
                <br></br>
                <center>
                        <table>
                                <tr>
                                  <th>OrderID</th>
                                  <th>Date</th>
                                  <th>Status</th>
                                </tr>
                                <tr>
                                    <td>{props.orderID}</td>
                                    <td>{date}</td>
                                    <td>{status}</td>
                                </tr>
                        </table>
                    </center>
                <br></br>
                <br></br>
                <h1 class="heading-primary">
                    <span class="heading-primary-sub">Customer</span>
                </h1>
                <br></br>
                <center>
                        <table>
                                <tr>
                                  <th>Identification number</th>
                                  <th>Name</th>
                                  <th>Address</th>
                                  <th>Email</th>
                                  <th>Phone</th>
                                </tr>
                                <tr>
                                    <td>{props.customerID}</td>
                                    <td>{customerName}</td>
                                    <td>{customerAddress}</td>
                                    <td>{customerEmail}</td>
                                    <td>{customerPhone}</td>
                                 </tr>
                        </table>
                </center>
                <br></br>
                <br></br>
                <h1 class="heading-primary">
                    <span class="heading-primary-sub">Detail</span>
                </h1>
                <br></br>
                <center>
                        <table>
                                <tr>
                                  <th>Product</th>
                                  <th>Price</th>
                                  <th>Amount</th>
                                  <th>Total</th>
                                </tr>
                                {
                                lists.map((Item) => {
                                    return(
                                        <tr key={Item.id}>
                                            
                                            <td>{Item.productID}</td>
                                            <td>{Item.price}</td>
                                            <td>{Item.amount}</td>
                                            <td>{Item.amount * Item.price} </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                        <h1 class="heading-primary">
                        <span class="heading-primary-sub">Total : {total}</span>
                         </h1>
                </center>
                <br></br>
                <br></br>
                <h1 class="heading-primary">
                    <span class="heading-primary-sub">Payment</span>
                </h1>
                <br></br>
                <center>
                    <table>
                            <tr>
                              <th>Image</th>
                              <th>Date</th>
                            </tr>
                            {
                            listsPayment.map((Item) => {
                                return(
                                    <tr key={Item.productID}>
                                        <center><a href={Item.image}><img src={Item.image} width="100" height="150"/></a></center>
                                        <td>{Item.date}</td>
                                    </tr>
                                )
                            })
                            }
                    </table>
                </center>
                <br></br>
                <br></br>
                <div class="text-box">
                    <a href="#" class="btn btn-green btn-animated" onClick = {(e) => setBill("Packed")}>Packed</a>
                    <a href="#" class="btn btn-red btn-animated" onClick = {(e) => setOrder("Cancel")}>Cancel</a>
                </div>
                <br></br>
                <br></br>
                <div class="text-box">
                    <a href="/OrderSetupPage" class="btn btn-while btn-animated">Back</a>    
                </div>
                <br></br>
                <br></br>
            </body>
        </div>
    )
}
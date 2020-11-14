import React, { useState } from 'react';
import { employee } from '../firebase'
import '../css/main.css';

export default function EmployeeSetupPage(){

    //set database user
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [name , setName] = useState("")
    const [age , setAge] = useState("")
    const [sex , setSex] = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")

    const [lists , setLists] = useState([])

    const [mounted, setMounted] = useState(false)

    if(!mounted){
        setMounted(true)
        const tmpLists = []
        employee.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                const taskformat = {
                    username : doc.id,
                    password : doc.data().password,
                    name : doc.data().name,
                    age : doc.data().age,
                    sex : doc.data().sex,
                    phoneNumber : doc.data().phoneNumber
                }
                tmpLists.push(taskformat)
            });
            setLists(tmpLists)
        });
    }
    

    const setEmployee = (e) => {
        e.preventDefault()
        if(username == "" || password == "" || name == "" || age == "" || sex == "" || phoneNumber == ""){
            window.alert("Please try again")
        }else if(isNaN(parseInt(age)) || isNaN(parseInt(phoneNumber))){
            window.alert("Please check format age or phonenumber again!")
        }else if(phoneNumber.length != 10){
            window.alert("The length of the number must be 10")
        }else if(sex != "Male" && sex != "Female"){
            window.alert("Sex must be Male or Female")
        }else{
            employee.doc(username).set({
                password: password,
                name: name,
                age: parseInt(age),
                sex: sex,
                phoneNumber: phoneNumber
            }).then(function(){    
                setUsername("")
                setName("")
                setAge("")
                setSex("")
                setPhoneNumber("")
                setPassword("")
                window.alert("Success")
                window.location.reload()
            });
        }
    }

    const deleteItem = (e) =>{
        employee.doc(e).delete().then(function(){    
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
                        <span class="heading-primary-sub">User</span>
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
                              <th>Username</th>
                              <th>Password</th>
                              <th>Name</th>
                              <th>Age</th>
                              <th>Sex</th>
                              <th>Phone</th>
                              <th>Delete</th>
                            </tr>
                            {
                            lists.map((Item) => {
                                return(
                                    <tr key={Item.username}>
                                        <td>{Item.username}</td>
                                        <td>{Item.password}</td>
                                        <td>{Item.name}</td>
                                        <td>{Item.age}</td>
                                        <td>{Item.sex}</td>
                                        <td>{Item.phoneNumber}</td>
                                        <td class="btn btn-red btn-animated" onClick={() => deleteItem(Item.username)}>delete</td>
                                    </tr>
                                )
                            })
                            }
                        </table>
                </center>
                <br></br>
                <br></br>
                <br></br>
                <h1>
                    <input type="text" class="input" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required=""/>
                    <br></br>
                    <input type="password" class="input" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
                    <br></br>
                    <input type="text" class="input" id="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required=""/>
                    <br></br>
                    <input type="text" class="input" id="Age" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required=""/>
                    <br></br>
                    <input type="text" class="input" id="Sex" placeholder="Sex" value={sex} onChange={(e) => setSex(e.target.value)} required=""/>
                    <br></br>
                    <input type="text" class="input" id="Phonenumber" placeholder="Phonenumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required=""/>
                    <div><a href="#" class="btn btn-white btn-animated" onClick = {setEmployee}>Add/Update</a></div>
                </h1>
            </body>
        </div>
    )
}
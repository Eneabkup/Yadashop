import { initializeApp } from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCl4bWIuax5F82LXVfyUXSzOteknpQjRn4",
    authDomain: "yadashop-3e07d.firebaseapp.com",
    databaseURL: "https://yadashop-3e07d.firebaseio.com",
    projectId: "yadashop-3e07d",
    storageBucket: "yadashop-3e07d.appspot.com",
    messagingSenderId: "216458170250",
    appId: "1:216458170250:web:60fab8648752977e008273",
    measurementId: "G-GQK0BSQVG2"
};

const app = initializeApp(firebaseConfig)

export const db = app.firestore()
export const userCollection = db.collection('user')
export const equipmentCollection = db.collection('equipment')
export const orderCollection = db.collection('order')

export const bill = db.collection('Bill')
export const customer = db.collection('Customer')
export const detail = db.collection('Detail')
export const employee = db.collection('Employee')
export const order = db.collection('Order')
export const payment = db.collection('Payment')
export const product = db.collection('Product')
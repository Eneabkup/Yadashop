import React from 'react';
import '../css/AdminPage.css';

export default function AdminPage(){
    
    return (
        <div>
            <header class="header-admin">
                <div class="brand-box">
                    <span class="brand">Admin</span>
                </div>
    
                <div class="text-box">
                    <h1 class="heading-primary">
                        <span class="heading-primary-main">Management</span>
                        <span class="heading-primary-sub">Please select</span>
                    </h1>
                    <a href="/UserSetupPage" class="btn btn-white btn-animated">User</a>
                    <a href="/StockSetupPage" class="btn btn-white btn-animated">Stock</a>
                    <a href="/OrderSetupPage" class="btn btn-white btn-animated">Order</a>
                    <a href="/" class="btn btn-white btn-animated">Logout</a>
                </div>
            </header>
        </div>
    );
}
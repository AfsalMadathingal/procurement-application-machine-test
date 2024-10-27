import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Suppliers from './pages/Suppliers';
import Items from './pages/Items';
import PurchaseOrders from './pages/PurchaseOrders';
import Dashboard from './components/CardComponent';


const App = () => {
    return (
        <Router>
            <div className="container flex ">
            <Dashboard />
                <Routes>
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/items" element={<Items />} />
                    <Route path="/purchase-orders" element={<PurchaseOrders />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

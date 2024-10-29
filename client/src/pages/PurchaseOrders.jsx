import React, { useEffect, useState } from 'react'
import PurchaseOrderList from '../components/PurchaseOrderList'
import toast from 'react-hot-toast';
import { getOrders } from '../services/purchaseOrderService';

const PurchaseOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

const fetchOrders = async () => {
  try {
    const response = await getOrders();
    if (response.status === 200) {
      setOrders(response.data);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

useEffect(() => {
  fetchOrders();  
}, []);



  return (
    <div className='flex w-screen'>
      <PurchaseOrderList orders={orders} />
    </div>
  )
}

export default PurchaseOrders

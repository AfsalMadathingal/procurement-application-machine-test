import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_API_URL}/api/purchase-orders`;

export const createPurchaseOrder = async (order) => {
    try {
        const response = await axios.post(API_URL, order);
        return response.data;
    } catch (error) {
        console.error('Error creating purchase order:', error);
        throw error;
    }
};


export const getOrderNo = async () => {
    try {

        const response = await axios.get(`${API_URL}/order-number`);
        return response.data;

    } catch (error) {

        console.error('Error getting order no:', error);
        throw error;
    }
}


export const getOrders = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
}

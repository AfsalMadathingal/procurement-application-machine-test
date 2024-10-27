import axios from 'axios';

const API_URL = 'http://localhost:5001/api/suppliers'; 


export const getSuppliers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createSupplier = async (supplier) => {
    const response = await axios.post(API_URL, supplier);
    return response.data;
};



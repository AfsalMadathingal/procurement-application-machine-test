import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_API_URL}/api/suppliers`; 


export const getSuppliers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createSupplier = async (supplier) => {
    const response = await axios.post(API_URL, supplier);
    return response.data;
};

export const updateSupplier = async (supplier) => {
    console.log(supplier);
    
    const response = await axios.patch(`${API_URL}/${supplier.supplierNo}`, supplier);
    return response.data;
};




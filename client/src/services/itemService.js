import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_API_URL}/api/items`; 

export const getItems = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createItem = async (item) => {

    const response = await axios.post(API_URL, item, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const updateItem = async (item) => {
    console.log(item);
    
    const response = await axios.patch(`${API_URL}/${item.itemNo}`, item);
    return response.data;
};


export const getItemsBySupplier = async (supplierNo) => {
    const response = await axios.get(`${API_URL}/supplier/${supplierNo}`);
    return response.data;
};


import React, { useEffect, useState } from 'react'
import ItemList from '../components/ItemList'
import { getItems } from '../services/itemService';
import toast from 'react-hot-toast';

const Items = () => {
const [items, setItems] = useState([]);


  const fetchItems = async () => {
    try {
      toast.loading("Loading...");
      const response = await getItems();

      if (response.status === 200) {
        toast.dismiss();
        console.log(response.data);
      }
      setItems(response.data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  return (
    <div className='flex w-screen '>
      <ItemList items={items} />
    </div>
  )
}  

export default Items

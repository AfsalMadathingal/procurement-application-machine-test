import React, { useEffect, useState } from "react";
import SupplierList from "../components/SupplierList";
import { getSuppliers } from "../services/supplierService";
import toast from "react-hot-toast";

const Suppliers = () => {

  const [suppliers, setSuppliers] = useState([]);


  const  fetchSuppliers = async () => {
    try {
      toast.loading("Loading...");
      const response = await getSuppliers();

      if (response.status === 200) {
       
        console.log(response.data);
        
        setSuppliers(response.data);
        toast.dismiss();
      }
      
    } catch (error) {

      toast.error(error.message);
      
    }

  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div>
      <SupplierList suppliersData={suppliers} />
    </div>
  );
};

export default Suppliers;

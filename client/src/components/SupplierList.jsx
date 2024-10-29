import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faBan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SupplierModal from "./SupplierForm";
import { createSupplier, updateSupplier } from "../services/supplierService";
import toast from "react-hot-toast";
import Switch from "./toggleSwitch";
import SupplierListSkelton from "./ListSkelton";

const SupplierList = ({ suppliersData }) => {
  const [showModal, setShowModal] = useState(false);
  const [suppliers, setSuppliers] = useState(suppliersData);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  SupplierList.propTypes = {
    suppliersData: PropTypes.array,
  };



  const onSubmit = async (formData) => {
    toast.loading("Saving...");
  
    try {
      let response;
  
      if (selectedSupplier) {
        response = await updateSupplier(formData);
      } else {
        response = await createSupplier(formData);
      }
  
      if (response.status === 200 || response.status === 201) {
        toast.dismiss();
        toast.success(selectedSupplier ? "Supplier updated successfully" : "Supplier created successfully");
        setShowModal(false);
        return;
      }
  
      toast.dismiss();
      toast.error(selectedSupplier ? "Failed to update supplier" : "Failed to create supplier");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(selectedSupplier ? "Failed to update supplier" : "Failed to create supplier");
    }
  };
  

  const changeStatus = async (supplier) => {
    try {
      const status = supplier.status === "Active" ? "Inactive" : "Active";
      const response = await updateSupplier({
        status,
        supplierNo: supplier.supplierNo,
      });

      if (response.status === 200) {
        toast.success("Supplier status updated successfully");
        const updatedSuppliers = suppliers.map((s) => {
          if (s.supplierNo === supplier.supplierNo) {
            return { ...s, status };
          }
          return s;
        });
        setSuppliers(updatedSuppliers);
        return;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleOpenModal = (supplier = null) => {

    if (supplier) {
      const {_id, status, __v, ...rest} = supplier
      setSelectedSupplier(rest);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSupplier(null); 
  };



  useEffect(() => {
    setSuppliers(suppliersData);
  }, [suppliersData]);

  return (
    <>
      <SupplierModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
        initialData={selectedSupplier}
      />
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Supplier
        </button>
      </div>

      {suppliers.length != 0 ? (
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Supplier Management
              </h1>
          
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers?.map((supplier, index) => (
                  <tr
                    key={supplier.supplierNo}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {supplier.supplierNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {supplier.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>Email: {supplier.email}</div>
                      <div>Mobile: {supplier.mobileNo}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {supplier.country}
                      </div>
                      <div className="text-sm text-gray-500">
                        {supplier.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {supplier.taxNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex flex-col items-center">
                      <Switch
                        onChange={() => changeStatus(supplier)}
                        isActive={supplier.status === "Active"}
                      />
                      <span className="ml-2 ">{supplier.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleOpenModal(supplier)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FontAwesomeIcon icon={faEdit} className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            console.log("Block supplier:", supplier.supplierNo)
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          <FontAwesomeIcon icon={faBan} className="mr-1" />
                          Block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <SupplierListSkelton />
      )}
    </>
  );
};

export default SupplierList;

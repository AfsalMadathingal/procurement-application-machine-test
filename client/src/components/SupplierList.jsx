import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SupplierModal from './SupplierForm';

const SupplierList = ({ suppliers = [
  {
    supplierNo: "SUP12345",
    name: "ABC Supplies Ltd.",
    address: "1234 Industrial Park, Sector 5, Cityname",
    taxNo: "TXN123456789",
    country: "India",
    mobileNo: "+919876543210",
    email: "contact@abcsupplies.com",
    status: "Active"
  }
] }) => { 

   const [showModal, setShowModal] = useState(false);


  

    SupplierList.propTypes = {
        suppliers: PropTypes.array
    }



  const navigate = useNavigate();

  return (
    <>
    <SupplierModal isOpen={showModal} onClose={()=>setShowModal(false)} />

    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Supplier Management</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.map((supplier, index) => (
              <tr key={supplier.supplierNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
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
                  <div className="text-sm text-gray-900">{supplier.country}</div>
                  <div className="text-sm text-gray-500">{supplier.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.taxNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    supplier.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <FontAwesomeIcon 
                      icon={supplier.status === 'Active' ? faCheckCircle : faTimesCircle} 
                      className="mr-1"
                    />
                    {supplier.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => navigate(`/suppliers/edit/${supplier.supplierNo}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => console.log('Delete supplier:', supplier.supplierNo)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default SupplierList;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faToggleOn, 
  faToggleOff,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ItemModal from './ItemForm';

const ItemList = ({ items = [
  {
    itemNo: "ITM1",
    itemName: "Wireless Mouse",
    inventoryLocation: "Warehouse A",
    brand: "Logitech",
    category: "Electronics",
    supplier: "Supplier001",
    stockUnit: "Pcs",
    unitPrice: 1200,
    itemImages: [
      "https://example.com/images/mouse1.jpg",
      "https://example.com/images/mouse2.jpg"
    ],
    status: "Enabled"
  }
] }) => {
   const [showModal, setShowModal] = useState(false);

  ItemList.propTypes = {
    items: PropTypes.array
  }
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (

    <>
    <ItemModal  isOpen={ showModal } onClose={() => setShowModal(false)} onSubmit={() => {}} suppliers={[]} />
    <div className="p-6 bg-gray-50 min-h-screen ">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Item Management</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Item
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category & Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={item.itemNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{item.itemNo}</div>
                  <div className="text-sm text-gray-500">{item.itemName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{item.category}</div>
                  <div className="text-sm text-gray-500">{item.brand}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{item.inventoryLocation}</div>
                  <div className="text-sm text-gray-500">
                    Unit: {item.stockUnit}
                  </div>
                  <div className="text-sm text-gray-500">
                    Supplier: {item.supplier}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(item.unitPrice)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faImage} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {item.itemImages.length} images
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Enabled' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <FontAwesomeIcon 
                      icon={item.status === 'Enabled' ? faToggleOn : faToggleOff} 
                      className="mr-1"
                    />
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => navigate(`/items/edit/${item.itemNo}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => console.log('Delete item:', item.itemNo)}
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

export default ItemList;
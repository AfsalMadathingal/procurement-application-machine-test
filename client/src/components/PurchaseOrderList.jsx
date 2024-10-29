import React, { useEffect } from 'react';
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

const PurchaseOrderList = ({ orders}) => {

  PurchaseOrderList.propTypes = {
    orders: PropTypes.array
  }

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  useEffect(() => {
    console.log(orders);
    
  }, []);

  return (
<div className="p-6 bg-gray-50 w-[1200px]">
  {/* Header Section */}
  <div className="mb-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Purchase Order Management</h1>
      <button
        onClick={() => navigate('/purchase-orders/add')}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FontAwesomeIcon icon={faPlus} />
        Add Purchase Order
      </button>
    </div>
  </div>

  {/* Table Section */}
  <div className="bg-white rounded-lg shadow overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order No</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders?.map((order, index) => (
          <tr key={order._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(order.orderDate)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.supplier}</td>
            <td className="px-6 py-4 text-sm text-gray-900">
              {order.items.map((item, idx) => (
                <div key={item._id} className="mb-1">
                  <div className="font-semibold">{item.itemName} ({item.selectedStockUnit})</div>
                  <div>Qty: {item.qty}, Unit Price: {formatCurrency(item.unitPrice)}</div>
                </div>
              ))}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(order.totalAmount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default PurchaseOrderList;
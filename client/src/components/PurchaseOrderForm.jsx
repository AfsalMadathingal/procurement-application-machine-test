import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getSuppliers } from "../services/supplierService";
import { getItemsBySupplier } from "../services/itemService";
import toast from "react-hot-toast";
import { createPurchaseOrder, getOrderNo } from "../services/purchaseOrderService";
import { validateOrder } from "../utils/validator";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const PurchaseOrder = () => {
  const [supplier, setSupplier] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [orderNo , setOrderNo] = useState("");
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [inventory, setInventory] = useState([]);
  const [items, setItems] = useState([{ slNo: 1 }]);
  const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);

  const updateItem = (index, itemNo) => {
    const inventoryItem = inventory.find((item) => item.itemNo === itemNo);
    if (inventoryItem) {
      const updatedItems = items.map((item, i) =>
        i === index
          ? {
              ...inventoryItem,
              slNo: index + 1,
              qty: 1,
              total: inventoryItem.stockUnitAndPrice?.[0]?.price || 0,
            }
          : item
      );

      if (index === items.length - 1) {
        updatedItems.push({ slNo: items.length + 1 });
      }

      setItems(updatedItems);
    }
  };

  const handleStockUnitChange = (index, selectedStockUnit) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const unitData = item.stockUnitAndPrice.find(
          (unit) => unit.stockUnit === selectedStockUnit
        );
        return {
          ...item,
          selectedStockUnit,
          unitPrice: unitData?.unitPrice || 0,
          total: item.qty * (unitData?.unitPrice || 0),
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const updateQuantity = (index, qty) => {
    const newQty = Math.max(1, parseInt(qty) || 0);
    setItems(
      items.map((item, i) =>
        i === index
          ? { ...item, qty: newQty, total: newQty * item.unitPrice }
          : item
      )
    );
  };

  const orderTotal = items.reduce((sum, item) => sum + (item.total || 0), 0);

  const fetchData = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchInventory = async (supplier) => {
    try {
      const response = await getItemsBySupplier(supplier);
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const fetchOrderNo = async () => {
  
    const response = await getOrderNo();

    if (response.status === 200) {
      setOrderNo(response.data);
    }
    
  };

  useEffect(() => {
    fetchData();
    fetchOrderNo();
  }, []);

  useEffect(() => {
    if (supplier) fetchInventory(supplier);
  }, [supplier]);

  // Create order object to send to the database
  const createOrderObject = () => {
    const filteredItems = items.filter((item) => item.itemNo); // Only include items with itemNo
    
    return {
      supplier,
      orderDate,
      items: filteredItems.map(({ slNo, __v, status, _id, itemImages, stockUnitAndPrice, ...item }) => item),
      totalAmount: orderTotal,
    };
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    const orderData = createOrderObject();
    try {

      const error = validateOrder(orderData);
      if (error) {
        console.log(error);
         toast.error("Please fill all the required fields");
        return;
      }


      console.log(orderData);
      

      const response = await createPurchaseOrder(orderData);

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
      toast.success("Order submitted successfully");

      }
 

    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order");
    }
  };

  
  const exportToPDF = async (print=false) => {
    const orderData = createOrderObject();
  
    const error = validateOrder(orderData);
    if (error) {
      console.log(error);
      toast.error("Please fill all the required fields");
      return;
    }
  
    const doc = new jsPDF();
  
    // Add a logo or header image
    const logoUrl = '/2004138.webp'; // Replace with your actual logo URL
    const imgData = await fetchAndConvertToBase64(logoUrl);
    doc.addImage(imgData, 'PNG', 14, 10, 40, 20);
  
    // Add title with custom styling
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Purchase Order", 14, 40);
    
    // Reset font for general text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
  
    // Order Details Section
    doc.text(`Order No: ${orderNo}`, 14, 50);
    doc.text(`Supplier: ${orderData.supplier}`, 14, 60);
    doc.text(`Order Date: ${new Date(orderData.orderDate).toLocaleDateString()}`, 14, 70);
  
    // Table with custom header and styles
    doc.autoTable({
      startY: 80,
      head: [["Sl No", "Item No", "Item Name", "Brand", "Packing", "Qty", "Unit Price", "Total"]],
      body: orderData.items.map((item, index) => [
        index + 1,
        item.itemNo,
        item.itemName,
        item.brand,
        item.selectedStockUnit,
        item.qty,
        item.unitPrice.toFixed(2),
        item.total.toFixed(2),
      ]),
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 12 },
      bodyStyles: { fontSize: 10, cellPadding: 3 },
      styles: { lineColor: [120, 120, 120], lineWidth: 0.2 },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 20 },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 15 },
        6: { cellWidth: 25 },
        7: { cellWidth: 20 },
      }
    });
  
    // Add total amount with some styling
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: $${orderData.totalAmount.toFixed(2)}`, 14, doc.previousAutoTable.finalY + 10);
    doc.save(`PurchaseOrder_${orderNo}.pdf`);
    if(print) {
      return doc;
    }
    // Save the PDF
   
  };
  
  // Utility function to fetch and convert image to base64
  const fetchAndConvertToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      items.map((item) => ({
        "Sl No": item.slNo,
        "Item No": item.itemNo,
        "Item Name": item.itemName,
        Brand: item.brand,
        Packing: item.selectedStockUnit,
        Qty: item.qty,
        "Unit Price": item.unitPrice,
        Total: item.total,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Purchase Order");
    XLSX.writeFile(wb, `PurchaseOrder_${orderNo}.xlsx`);
  };

  // Print functionality
  const printOrder = async () => {
  const doc = await exportToPDF(true);  // Generate the PDF first
  const pdfBlob = doc.output("blob");  // Convert PDF to blob
  const pdfUrl = URL.createObjectURL(pdfBlob);  // Create a URL for the blob

  // Open the PDF in a new window and trigger print
  const pdfWindow = window.open(pdfUrl);
  if (pdfWindow) {
    pdfWindow.addEventListener("load", () => {
      pdfWindow.print();
    });
  }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">Purchase Order</h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Supplier Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() =>
                  setIsSupplierDropdownOpen(!isSupplierDropdownOpen)
                }
              >
                <span className="block truncate">
                  {supplier
                    ? ` ${supplier} - ${
                        suppliers?.find(
                          (s) => s.supplierNo.toString() === supplier
                        )?.name
                      }`
                    : "Select supplier"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {isSupplierDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <ul className="py-1">
                    {suppliers?.map((sup) => (
                      <li
                        key={sup.supplierNo}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        onClick={() => {
                          setSupplier(sup.supplierNo.toString());
                          setIsSupplierDropdownOpen(false);
                        }}
                      >
                        {sup.name} ({sup.supplierNo})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Order Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Date
            </label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order No
            </label>
            <input
              type="text"
              value={orderNo}
              disabled
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Sl No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Item No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Packing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.slNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={item.itemNo || ""}
                      onChange={(e) => updateItem(index, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    >
                      <option value="" disabled>
                        Select item
                      </option>
                      {inventory.map((inv) => (
                        <option key={inv.itemNo} value={inv.itemNo}>
                          {inv.itemNo}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.itemName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      className="border border-gray-300 rounded-md px-2 py-1"
                      value={item.selectedStockUnit || ""}
                      onChange={(e) =>
                        handleStockUnitChange(index, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select stock unit
                      </option>
                      {item?.stockUnitAndPrice?.map((unit) => (
                        <option key={unit.stockUnit} value={unit.stockUnit}>
                          {unit.stockUnit}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      min="1"
                      value={item.qty || 1}
                      onChange={(e) => updateQuantity(index, e.target.value)}
                      className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(item.unitPrice || 0).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(item.total || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Section */}
        <div className="flex justify-end">
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="font-medium text-lg">
              Total: ${orderTotal.toFixed(2)}
            </span>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmitOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Submit Order
          </button>
        </div>




        <div className="flex justify-end mt-4 space-x-2">
        <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Export to PDF
        </button>
        <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
          Export to Excel
        </button>
        <button onClick={printOrder} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
          Print
        </button>
      </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;

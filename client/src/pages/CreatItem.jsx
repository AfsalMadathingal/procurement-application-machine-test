import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { getSuppliers } from '../services/supplierService';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../services/itemService';

const CreateItem = () => {
  const [suppliersList, setSuppliersList] = useState([]);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    itemName: '',
    inventoryLocation: '',
    brand: '',
    category: '',
    supplier: '',
    status: 'Enabled',
  });
  
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [stockUnitAndPrice, setStockUnitAndPrice] = useState([{ stockUnit: '', unitPrice: '' }]);
  const stockUnits = ["Kg", "Ltr", "Pcs", "Box"];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    handleNewImages(files);
  };

  const handleNewImages = (files) => {
    const validImageFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
    );

    const newImages = validImageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7)
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (idToRemove) => {
    setImages(prev => {
      const filtered = prev.filter(image => image.id !== idToRemove);
      const removedImage = prev.find(image => image.id === idToRemove);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview);
      }
      return filtered;
    });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleNewImages(files);
  };

  const handleStockUnitChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStockUnitAndPrice = [...stockUnitAndPrice];
    updatedStockUnitAndPrice[index][name] = value;
    setStockUnitAndPrice(updatedStockUnitAndPrice);
  };

  const addStockUnitAndPrice = () => {
    setStockUnitAndPrice((prev) => [...prev, { stockUnit: '', unitPrice: '' }]);
  };

  const removeStockUnitAndPrice = (index) => {
    if (stockUnitAndPrice.length > 1) {
      setStockUnitAndPrice((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    images.forEach((image) => {
      formDataToSubmit.append('images', image.file);
    });

    formDataToSubmit.append('stockUnitAndPrice', JSON.stringify(stockUnitAndPrice));

    const response = await createItem(formDataToSubmit);

    console.log( response);
    
    // onSubmit(formDataToSubmit);
    navigate('/items'); // Redirect after submission
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const suppliers = await getSuppliers();
        setSuppliersList(suppliers.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();

    return () => {
      images.forEach(image => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-auto my-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Add New Item</h2>
            <button 
              onClick={() => navigate('/items')}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Item Images</h3>
              
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Drag and drop images here, or
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Choose Images
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
     {/* Basic Information Section */}
     <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inventory Location
                  </label>
                  <input
                    type="text"
                    name="inventoryLocation"
                    value={formData.inventoryLocation}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter inventory location"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter brand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <select
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Supplier</option>
                  {suppliersList?.map((supplier) => (
                    <option key={supplier._id} value={supplier.supplierNo}>
                      {supplier.supplierNo + '-' + supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

 {/* Stock Units and Prices Section */}
 <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Stock Units and Prices</h3>
                <button
                  type="button"
                  onClick={addStockUnitAndPrice}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Unit
                </button>
              </div>

              <div className="space-y-3">
                {stockUnitAndPrice.map((entry, index) => (
                  <div key={index} className="flex items-end space-x-4 bg-gray-50 p-3 rounded-lg">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Unit
                      </label>
                      <select
                        name="stockUnit"
                        value={entry.stockUnit}
                        onChange={(e) => handleStockUnitChange(index, e)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select Unit</option>
                        {stockUnits.map((unit) => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit Price
                      </label>
                      <input
                        type="number"
                        name="unitPrice"
                        value={entry.unitPrice}
                        onChange={(e) => handleStockUnitChange(index, e)}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        placeholder="Enter unit price"
                      />
                    </div>

                    {stockUnitAndPrice.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStockUnitAndPrice(index)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
   </div>
   </div>

            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => navigate('/items')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;

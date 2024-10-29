const mongoose = require('mongoose');



const purchaseOrderSchema = new mongoose.Schema({

    orderNumber: { type: String, unique: true, required: true },
    supplier: { type: String, required: true },
    orderDate: { type: Date, required: true },
    items: [
        {
            itemNo: { type: String, required: true },
            itemName: { type: String, required: true },
            inventoryLocation: { type: String, required: true },
            brand: { type: String, required: true },
            category: { type: String, required: true },
            supplier: { type: String, required: true },
            qty: { type: Number, required: true },
            total: { type: Number, required: true },
            selectedStockUnit: { type: String, required: true },
            unitPrice: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true }

 
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
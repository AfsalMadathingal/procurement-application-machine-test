const mongoose = require('mongoose');



const purchaseOrderSchema = new mongoose.Schema({


orderNumber: { type: String, required: true },
orderDate: { type: Date, required: true },
supplierName: { type: String, required: true },
itemTotal : { type: Number, required: true },
discount : { type: Number, required: true },
netAmount: { type: Number, required: true },
 
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
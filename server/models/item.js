 const mongoose = require('mongoose');


 const itemSchema = new mongoose.Schema({

   itemNo: { type: String, unique: true, required: true },
   itemName: { type: String, required: true },
   inventoryLocation: { type: String, required: true },
   brand: { type: String, required: true },
   category: { type: String, required: true },
   supplier: { type: String, required: true },
   stockUnit: { type: String, required: true , enum: ["Kg", "Ltr", "Pcs", "Box"] },
   unitPrice: { type: Number, required: true },
   itemImages: { type: [String], required: true },
   status:{ type: String, required: true, default: "Enabled", enum: ["Enabled", "Disabled"] }
 });

 module.exports = mongoose.model('Item', itemSchema);
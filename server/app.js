const express = require('express');
const app = express();
const supplierRoutes = require('./routes/supplierRoutes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const itemsRoute = require('./routes/itemsRoute');
const purchaseOrderRoute = require('./routes/purchaseOrderRoute');
require('dotenv').config();
const cors = require('cors');


app.use(cors());


connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




app.use('/api/suppliers', supplierRoutes); 
app.use('/api/items',  itemsRoute); 
app.use('/api/purchase-orders', purchaseOrderRoute);


app.use(errorHandler)

module.exports = app;

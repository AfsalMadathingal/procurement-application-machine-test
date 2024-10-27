const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');




router.get('/',purchaseOrderController.getPurchaseOrders);
router.post('/',purchaseOrderController.addPurchaseOrder);
router.get('/:id',purchaseOrderController.getPurchaseOrderById);
router.patch('/:id',purchaseOrderController.updatePurchaseOrder);




module.exports = router;
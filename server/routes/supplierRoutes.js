const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.get('/', supplierController.getSuppliers);
router.post('/', supplierController.addSupplier);
router.get('/:id', supplierController.getSupplierById);
router.patch('/:id', supplierController.updateSupplier);

module.exports = router;

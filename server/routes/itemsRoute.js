const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const upload = require('../utils/multer');



router.get('/',itemsController.getItems);
router.post('/',upload.array('images'),itemsController.addItem);
router.get('/:id',itemsController.getItemById);
router.patch('/:id',itemsController.updateItem);
router.delete('/:id',itemsController.deleteItem);
router.get('/supplier/:supplierNo',itemsController.getItemsBySupplier);



module.exports = router;
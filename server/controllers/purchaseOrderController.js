const PurchaseOrder = require('../models/purchaseOrder');
const HTTP_STATUS = require('../constants/httpStatus');
const apiResponse = require('../utils/apiResponse');


exports.addPurchaseOrder = async (req, res, next) => {
    try {


        const purchaseOrderNo = await PurchaseOrder.countDocuments();
        req.body.orderNumber = `PO${purchaseOrderNo + 1}`;

        const purchaseOrder = new PurchaseOrder(req.body);

        await purchaseOrder.save();
        res.status(HTTP_STATUS.CREATED).json(
            new apiResponse(HTTP_STATUS.CREATED, purchaseOrder, 'Purchase order created successfully')
        );
    } catch (error) {
        next(error);
    }
};


exports.getPurchaseOrders = async (req, res, next) => {
    try {
        const purchaseOrders = await PurchaseOrder.find();
        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, purchaseOrders, 'Success')
        );
    } catch (error) {
        next(error);
    }
};



exports.getPurchaseOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const purchaseOrder = await PurchaseOrder.findOne({ orderNumber: id });

        if (!purchaseOrder) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new apiResponse(HTTP_STATUS.NOT_FOUND, null, 'Purchase order not found')
            );
        }
        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, purchaseOrder, 'Success')
        );
    } catch (error) {
        next(error);
    }
};



exports.updatePurchaseOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const purchaseOrder = await PurchaseOrder.findOneAndUpdate({ orderNumber: id }, req.body, {
            new: true
        });
        if (!purchaseOrder) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new apiResponse(HTTP_STATUS.NOT_FOUND, null, 'Purchase order not found')
            );
        }
        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, purchaseOrder, 'Purchase order updated successfully')
        );
    } catch (error) {
        next(error);
    }
};



exports.deletePurchaseOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const purchaseOrder = await PurchaseOrder.findOneAndRemove({ orderNumber: id });
        if (!purchaseOrder) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new apiResponse(HTTP_STATUS.NOT_FOUND, null, 'Purchase order not found')
            );
        }
        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, null, 'Purchase order deleted successfully')
        );
    } catch (error) {
        next(error);
    }
};


 exports.getOrderNumber = async (req, res, next) => {
    try {

        console.log('====================================');
        console.log(req.params);
        
        const purchaseOrderNo = await PurchaseOrder.countDocuments();
        const orderNumber = `PO${purchaseOrderNo + 1}`;

        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, orderNumber, 'Success')
        );
    } catch (error) {
        next(error);
    }
}
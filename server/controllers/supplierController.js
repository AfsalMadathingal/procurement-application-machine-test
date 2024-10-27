const HTTP_STATUS = require('../constants/httpStatus');
const Supplier = require('../models/Supplier');
const apiResponse = require('../utils/apiResponse');


exports.getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find();

        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, null, 'Success', suppliers)
        );
    } catch (error) {
        next(error);

    }
};


exports.addSupplier = async (req, res, next) => {
    try {

        const supplierNo = await Supplier.countDocuments();

        req.body.supplierNo = `SUP${supplierNo + 1}`;
        
        const newSupplier = new Supplier(req.body);
        await newSupplier.save();


        res.status(HTTP_STATUS.CREATED).json(
            new apiResponse(HTTP_STATUS.CREATED, null, 'Success', newSupplier)
        );


    } catch (error) {
        next(error);

    }
};



exports.getSupplierById = async (req, res, next) => {

    try {

        const { id } = req.params;


        const supplier = await Supplier.findOne({supplierNo: id});

        if (!supplier) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new apiResponse(HTTP_STATUS.NOT_FOUND, null, 'Supplier not found')
            );
        }

        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, supplier, 'Success')
        );
    } catch (error) {
        next(error);
    }
};


exports.updateSupplier = async (req, res, next) => {
    try {

        const { id } = req.params;
        
        const supplier = await Supplier.findOneAndUpdate({supplierNo: id}, req.body, {
            new: true
        });

        if (!supplier) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new apiResponse(HTTP_STATUS.NOT_FOUND, null, 'Supplier not found')
            );
        }

        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, supplier, 'Success')
        );
    } catch (error) {
        next(error);
    }
};
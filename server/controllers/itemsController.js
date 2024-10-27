const Item = require('../models/item');
const HTTP_STATUS = require('../constants/httpStatus');
const apiResponse = require('../utils/apiResponse');


exports.getItems = async (req, res, next) => {
    try {
        const items = await Item.find();

        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, items, 'Success')
        );
    } catch (error) {
        next(error);

    }
};

exports.addItem = async (req, res, next) => {
    try {


        const itemNo = await Item.countDocuments();
        req.body.itemNo = `ITM${itemNo + 1}`

        const item = new Item(req.body);

        await item.save();


        res.status(HTTP_STATUS.CREATED).json(
            new apiResponse(HTTP_STATUS.CREATED, item, 'Success')
        );
    } catch (error) {
        next(error);

    }
};

exports.getItemById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const item = await Item.findOne({ itemNo: id });

        if (!item) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new apiResponse(HTTP_STATUS.NOT_FOUND, null, 'Item not found')
            );
        }

        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, item, 'Success')
        );
    } catch (error) {
        next(error);
    }
};

exports.updateItem = async (req, res, next) => {
    try {

        const { id } = req.params;

        const item = await Item.findOneAndUpdate({ itemNo: id }, req.body, {
            new: true
        });

        if (!item) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new apiResponse(HTTP_STATUS.NOT_FOUND, null, 'Item not found')
            );
        }

        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, item, 'Success')
        );
    } catch (error) {
        next(error);
    }
};

exports.deleteItem = async (req, res, next) => {

    try {

        const { id } = req.params;

        const item = await Item.findByIdAndRemove(id);

        if (!item) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new apiResponse(HTTP_STATUS.NOT_FOUND, null, 'Item not found')
            );
        }

        res.status(HTTP_STATUS.OK).json(
            new apiResponse(HTTP_STATUS.OK, null, 'Success')
        );
    } catch (error) {
        next(error);
    }
};

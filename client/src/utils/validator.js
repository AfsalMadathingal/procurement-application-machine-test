import joi from 'joi';
import { getNames } from 'country-list';

const countryNames = getNames();

const supplierSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    taxNo: joi.string().required(),
    country: joi.string().valid(...countryNames).required(),
    mobileNo: joi.string().pattern(/^\d{10,15}$/).required(),
    email: joi.string().email({ tlds: { allow: false } }).required(),
    supplierNo: joi.string(),
});

export const validateSupplier = (supplier) => {
    const { error } = supplierSchema.validate(supplier , { abortEarly: false });
    if (error) {
        const formattedErrors= {};
        error.details.forEach((detail) => {
          formattedErrors[detail.path[0]] = detail.message;
        });
    
        return formattedErrors;
    }
    return null;
};


const orderValidationSchema = joi.object({
    supplier: joi.string().required().messages({
      'string.empty': 'Supplier is required.',
    }),
    orderDate: joi.date().iso().required().messages({
      'date.base': 'Order date must be a valid date.',
      'date.format': 'Order date must be in ISO format (e.g., YYYY-MM-DD).',
    }),
    items: joi.array()
      .items(
        joi.object({
          itemNo: joi.string().required().messages({
            'string.empty': 'Item number is required.',
          }),
          itemName: joi.string().required().messages({
            'string.empty': 'Item name is required.',
          }),
          qty: joi.number().integer().positive().required().messages({
            'number.base': 'Quantity must be a number.',
            'number.integer': 'Quantity must be an integer.',
            'number.positive': 'Quantity must be a positive number.',
          }),
          selectedStockUnit: joi.string().required().messages({
            'string.empty': 'Stock unit is required.',
          }),
          unitPrice: joi.number().positive().required().messages({
            'number.base': 'Unit price must be a number.',
            'number.positive': 'Unit price must be a positive number.',
          }),
          total: joi.number().positive().required().messages({
            'number.base': 'Total must be a number.',
            'number.positive': 'Total must be a positive number.',
          }),
          supplier: joi.string().required().messages({
            'string.empty': 'Supplier is required.',
          }),
          category: joi.string().required().messages({
            'string.empty': 'Category is required.',
          }),
          brand : joi.string().required().messages({
            'string.empty': 'Brand is required.',
          }),
          inventoryLocation: joi.string().required().messages({
            'string.empty': 'Inventory location is required.',
          }),

        })
      )
      .min(1)
      .required()
      .messages({
        'array.min': 'At least one item is required in the order.',
      }),
    totalAmount: joi.number().positive().required().messages({
      'number.base': 'Total amount must be a number.',
      'number.positive': 'Total amount must be a positive number.',
    }),
  });

  export const validateOrder = (order) => {

    const { error } = orderValidationSchema.validate(order , { abortEarly: false });
    if (error) {
        const formattedErrors= {};
        error.details.forEach((detail) => {
          formattedErrors[detail.path[0]] = detail.message;
        });
    
        return formattedErrors;
    }
    return null;
  }
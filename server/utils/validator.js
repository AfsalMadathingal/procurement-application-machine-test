const joi = require('joi');
const { getNames } = require('country-list');

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

exports.validateSupplier = (supplier) => {
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

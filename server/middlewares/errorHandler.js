const HTTP_STATUS = require('../constants/httpStatus');


const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }


    res.status(statusCode).json({
        status: "error",
        statusCode,
        message: err.message || "An unexpected error occurred",
    });
};

module.exports = errorHandler;


const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err};
        error.message = err.message;
        console.log(err)

        //Mongoose Bad ObjectId
        if (err.name === 'CastError') {
            error.status = 404;
            error.success = false;
            error.message = 'Resource not found';
        }
        //Mongoose duplicate key error
        if (err.code === 11000) {
            error.status = 409;
            error.success = false;
            error.message = 'Duplicate key error';
        }

        //Mongoose validation error
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            error.status = 400;
            error.success = false;
            error.message = `Validation error: ${messages.join(', ')}`;
        }

        res.status(error.status || 500).json({
            status: 'error',
            success: false,
            message: error.message || 'Internal Server Error',
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
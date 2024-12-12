const {constants} = require("../constants");

const errorHandle = (err, req, res, next) => {
    // switch error instances using Constants
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation Error",
                message: err.message,
                stackTrace: err.stack});   
            break;
        // instance of NOT_FOUND_ERROR
        case constants.NOT_FOUND:
            res.json({title: "Not Found",
                message: "Resource not found",
                stackTrace: err.stack});
            break;
        // instance of INTERNAL_SERVER_ERROR
        case constants.INTERNAL_SERVER_ERROR:
            res.json({title: "Internal Server Error",
                message: "An error occurred on the server",
                stackTrace: err.stack});
            break;
        // instance of UNAUTHORIZED_ERROR
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized",
                message: "You are not authorized to access this resource",
                stackTrace: err.stack});
            break;
        // instance of FORBIDDEN_ERROR
        case constants.FORBIDDEN:
            res.json({title: "Forbidden",
                message: "You do not have the necessary permissions to access this resource",
                stackTrace: err.stack});
            break;
        default:
            console.log("No error occurred, server is running", err)
    };

};

module.exports = errorHandle;

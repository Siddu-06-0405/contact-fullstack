const { constants } = require("../constants")
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({//shift+Alt+F to format objects for javascript files in vscode
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({//shift+Alt+F to format objects for javascript files in vscode
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({//shift+Alt+F to format objects for javascript files in vscode
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Errors, All Good!")
      break;
  }
};

module.exports = errorHandler;
console.log(module.exports);

import logger from "../logs/logger.js";
export default function errorHandler(err, req, res, next) {
    console.log('error mombre: ' , err.name);
    logger.error(err.message );
    if (err.name === 'ValidationError') {
        res.status(401).json({nessage: err.message });
    } else if (err.name === 'JsonWebTokenError') {
        res.status(401).json({message: err.message });
    } else if (err.name === 'tokenExpiredError') {
        res.status(401).json({message: err.message });
    } else if (
        err.name === 'SequelizeValidationError' ||
        err.name === 'SequelizeUniqueConstraintError' ||
        err.name === 'SequelizeForeignKeyConstraintError' 
    ) {
        res.status(400).json({message: err.message });
    } else {
        res.status(500).json({message: err.message  });
    }
}

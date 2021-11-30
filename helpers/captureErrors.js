const logger = require('../config/logger');
const apm = require('elastic-apm-node');

const captureErrors = ( source, message) => {
    logger(source, message);
    apm.captureError(`source: ${ source }, level: error , message: ${ message }`);
}

module.exports = captureErrors;

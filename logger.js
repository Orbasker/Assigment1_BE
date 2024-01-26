const { createLogger, transports,format } = require('winston');


class Logger {
    constructor(filepath) {
        if (!filepath) {
            throw new Error('Cannot log to file without filename or stream.');
        }
        this.logger = createLogger({
            format: format.simple(),
            transports: [
                new transports.Console(),
                new transports.File({ filename: `Logs/${filepath}` })
            ]
        });
    }
    log(msg) {
        this.logger.info(`${new Date().toLocaleString()} : ${msg}`);
    }
    error(msg) {
        this.logger.error(`${new Date().toLocaleString()} : ${msg}`);
    }
    warn(msg) {
        this.logger.warn(`${new Date().toLocaleString()} : ${msg}`);
    }
}

module.exports = { Logger };

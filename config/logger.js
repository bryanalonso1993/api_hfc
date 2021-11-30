const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
require('winston-daily-rotate-file');

const timezoned = () => new Date().toLocaleString('en-US', { timeZone: 'America/Lima'});

const logFormat = printf( ({ level, message, label, timestamp }) => `${timestamp}|${label}|${level}|${message}` );

// https://www.npmjs.com/package/winston-daily-rotate-file

const consoleTransports = [
    new transports.Console(),
    new transports.DailyRotateFile({
        filename: './logs/logApplicationRotate-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    })
];

const logger = ( source, level, message ) => createLogger({
    format: combine(
        label({ label: source}),
        timestamp({ format: timezoned }),
        logFormat
    ),
    transports: consoleTransports
}).log({level, message});

/**
 *  Logger format : logger(source, level, message);
 */
module.exports = logger;

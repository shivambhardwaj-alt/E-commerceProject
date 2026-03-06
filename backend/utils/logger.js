import {createLogger ,transports,format, loggers} from 'winston';
import 'dotenv/config';
const isProduction =  process.env.ENV === 'PRODUCTION';


const logFormat = format.combine(
    format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
    format.errors({stack:true}),
    format.splat(),
    format.json(),
);

const transportArray =  [];
if(isProduction){
    transportArray.push(
        new transports.File({filename : 'logs/error.log',level:'error'}),
        new transports.File({filename : 'logs/combined.log'})
    )



}else{
    transportArray.push(
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({level,message,timestamp,stack
                }) => {
                     return stack
                    ? `[${timestamp}] ${level}: ${stack}`
                    : `[${timestamp}] ${level}: ${message}`;
                })
            )
        })
    )
}

const logger = createLogger({
    level  : isProduction ? 'info' : 'debug',
    format : logFormat,
    transports:transportArray,
    exitOnError : false
})






export default logger;
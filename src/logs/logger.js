import pino from 'pino';
//export const logger = pino({
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
        colorize: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        //ignore: 'pid,hostname',
       // levelFirst: true,
    },
  },
});

export default logger;
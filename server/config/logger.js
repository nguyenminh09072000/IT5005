import winston, { format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'
import * as rTracer from 'cls-rtracer'
import * as expressWinston from 'express-winston'

const prefixPath = path.resolve(__dirname).includes('logs') ? '../' : ''
const loggerBlacklist = [
  'authorization',
  'signature',
  'token',
  'password',
  'secret',
  'otp',
  'accessToken',
  'attributes',
  'heroes',
]
const loggerRoutes = ['*']

const loggerFormatter = format.printf(({ level, message, originalTimestamp, ...metadata }) => {
  const rid = rTracer.id()
  const timestamp = new Date().toISOString()
  return JSON.stringify({
    '@timestamp': timestamp,
    level,
    message,
    traceId: rid,
    ...metadata,
  })
})

export const logger = winston.createLogger({
  format: format.combine(loggerFormatter, format.splat()),
  transports: [
    new DailyRotateFile({
      filename: `${prefixPath}logs/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: 15,
      timestamp: true,
    }),
    new winston.transports.Console(),
  ],
})

export const middlewareLogger = expressWinston.logger({
  transports: [
    new DailyRotateFile({
      filename: `${prefixPath}logs/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: 15,
      timestamp: true,
    }),
    new winston.transports.Console(),
  ],
  format: winston.format.combine(loggerFormatter, winston.format.colorize()),
  meta: true,
  expressFormat: true,
  blacklistedMetaFields: loggerBlacklist,
  headerBlacklist: loggerBlacklist,
  bodyBlacklist: loggerBlacklist,
  requestWhitelist: ['body', 'url', 'method', 'query'],
  responseWhitelist: ['body', 'statusCode'],
  // eslint-disable-next-line no-unused-vars
  ignoreRoute(req, res) {
    if (loggerRoutes.some((v) => v === '*')) {
      return false
    }
    return !loggerRoutes.some((v) => req.path.includes(v))
  },
  // eslint-disable-next-line complexity
  dynamicMeta: (req, resp) => {
    const res = {}
    const meta = {}
    if (resp) {
      meta.res = res
      res.status = resp.statusCode
      if (resp.body && typeof resp.body === 'object') {
        res.body = omitField(resp.body, ...loggerBlacklist)
      }
    }
    return meta
  },
})

const omitField = (obj, ...props) => {
  const result = { ...obj }
  props.forEach((prop) => {
    delete result[prop]
  })
  return result
}

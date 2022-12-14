import { ACCESS_TOKEN_EXPIRED_TIME, API_STATUS, HTTP_STATUS } from '@root/utils/constant'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || '123456'

export const verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers.authorization
  if (!accessToken) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).send({
      status: API_STATUS.AUTH_ERROR,
      message: 'No access token',
    })
  }

  const payload = verifyJwtAccessToken(accessToken)
  if (!payload) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).send({
      status: API_STATUS.AUTH_ERROR,
      message: 'Invalid access token',
    })
  }
  const { username, role, iat } = payload
  if (iat + ACCESS_TOKEN_EXPIRED_TIME < Date.now() / 1000) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).send({
      status: API_STATUS.AUTH_ERROR,
      message: 'Token was expired',
    })
  }
  req.username = username
  req.role = role
  return next()
}

export const verifyJwtAccessToken = (token) => {
  const payload = jwt.verify(token, SECRET_KEY, (error, decoded) =>
    error
      ? {
          error: error.message,
        }
      : { username: decoded.username, role: decoded.role, iat: decoded.iat }
  )
  if (payload.error) {
    console.log('Invalid JWT access token.', { token })
  }
  return payload
}

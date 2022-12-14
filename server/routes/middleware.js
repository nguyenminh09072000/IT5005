import { verifyAccessToken } from '@root/middleware/auth'

export default (req, res, next) => verifyAccessToken(req, res, next)

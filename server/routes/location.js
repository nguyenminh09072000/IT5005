import express from 'express'
import { getFreeLocation } from '@root/controllers/location'
import { verifyAccessToken } from '@root/middleware/auth'

const locationRouter = express.Router()

locationRouter.use(verifyAccessToken)
locationRouter.post('/get-free-location', getFreeLocation)

export default locationRouter

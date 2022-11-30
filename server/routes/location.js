import express from 'express'
import { getFreeLocation } from '@root/controllers/location'

const locationRouter = express.Router()

locationRouter.get('/get-free-location', getFreeLocation)

export default locationRouter

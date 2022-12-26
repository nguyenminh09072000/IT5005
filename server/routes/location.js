import express from 'express';
import {getAllLocation, getFreeLocation} from '@root/controllers/location';
import {verifyAccessToken} from '@root/middleware/auth';

const locationRouter = express.Router();

locationRouter.use(verifyAccessToken);
locationRouter.post('/get-free-location', getFreeLocation);
locationRouter.get('/get-all', getAllLocation);
export default locationRouter;

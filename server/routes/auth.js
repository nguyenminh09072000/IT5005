import express from 'express';
import {registerAccount, login, deleteAccount} from '@root/controllers/auth';
const authRouter = express.Router();

authRouter.post('/register', registerAccount);
authRouter.post('/login', login);
authRouter.delete('/delete/:username', deleteAccount);

export default authRouter;

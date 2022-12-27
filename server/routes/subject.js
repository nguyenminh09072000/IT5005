import express from 'express';
import {
    createSubject,
    deleteSubject,
    getAllSubject,
    getSubject,
    updateSubject,
} from '@root/controllers/subject';
import {verifyAccessToken} from '@root/middleware/auth';

const subjectRouter = express.Router();
subjectRouter.use(verifyAccessToken);

subjectRouter.get('/get', getSubject);
subjectRouter.post('/update', updateSubject);
subjectRouter.post('/create', createSubject);
subjectRouter.post('/delete', deleteSubject);
subjectRouter.get('/get-all', getAllSubject);
export default subjectRouter;

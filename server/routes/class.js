import express from 'express';
import {
    addStudentToClass,
    createClass,
    deleteClass,
    deleteStudentFromClass,
    getAllClass,
    getClass,
    getStudentOfClass,
    setScore,
    updateClass,
} from '@root/controllers/class';
import {verifyAccessToken} from '@root/middleware/auth';

const classRouter = express.Router();
classRouter.use(verifyAccessToken);

classRouter.post('/get', getClass);
classRouter.post('/update', updateClass);
classRouter.post('/create', createClass);
classRouter.post('/delete', deleteClass);
classRouter.post('/get-student-list', getStudentOfClass);
classRouter.post('/set-score', setScore);
classRouter.post('/delete-student', deleteStudentFromClass);
classRouter.post('/add-student', addStudentToClass);
classRouter.get('/get-all', getAllClass);

export default classRouter;

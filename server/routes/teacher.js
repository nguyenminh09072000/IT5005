import express from 'express';
import {
    createTeacher,
    deleteTeacher,
    getAllTeacher,
    getTeacher,
    getTeacherClassList,
    updateTeacher,
} from '@root/controllers/teacher';
import {verifyAccessToken} from '@root/middleware/auth';

const teacherRouter = express.Router();
teacherRouter.use(verifyAccessToken);

teacherRouter.get('/get', getTeacher);
teacherRouter.post('/update', updateTeacher);
teacherRouter.post('/create', createTeacher);
teacherRouter.post('/delete', deleteTeacher);
teacherRouter.post('/get-class-list', getTeacherClassList);
teacherRouter.get('/get-all', getAllTeacher);

export default teacherRouter;

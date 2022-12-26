import express from 'express';
import {
    createStudent,
    deleteStudent,
    getAllStudent,
    getStudent,
    getStudentClassList,
    updateStudent,
} from '@root/controllers/student';
import {verifyAccessToken} from '@root/middleware/auth';

const studentRouter = express.Router();
studentRouter.use(verifyAccessToken);

studentRouter.get('/get', getStudent);
studentRouter.post('/update', updateStudent);
studentRouter.post('/create', createStudent);
studentRouter.post('/delete', deleteStudent);
studentRouter.post('/get-class-list', getStudentClassList);
studentRouter.get('/get-all', getAllStudent);

export default studentRouter;

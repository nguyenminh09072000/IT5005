import studentRouter from './student';
import classRouter from '@root/routes/class';
import subjectRouter from '@root/routes/subject';
import locationRouter from '@root/routes/location';
import teacherRouter from '@root/routes/teacher';
import swaggerUi from 'swagger-ui-express';

var options = {
    explorer: true,
    openapi: '3.0.0',
    basePath: '/',
    swaggerOptions: {
        validatorUrl: null,
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
};

const router = app => {
    // app.use('/admin', adminRouter)
    app.use('/class', classRouter);
    app.use('/student', studentRouter);
    app.use('/subject', subjectRouter);
    app.use('/teacher', teacherRouter);
    app.use('/location', locationRouter);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(options));
};

export default router;

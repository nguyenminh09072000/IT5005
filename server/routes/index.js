import studentRouter from './student'
import classRouter from '@root/routes/class'
import subjectRouter from '@root/routes/subject'
import locationRouter from '@root/routes/location'
import teacherRouter from '@root/routes/teacher'
import authRouter from '@root/routes/auth'

const router = (app) => {
  app.use('/class', classRouter)
  app.use('/student', studentRouter)
  app.use('/subject', subjectRouter)
  app.use('/teacher', teacherRouter)
  app.use('/location', locationRouter)
  app.use('/auth', authRouter)
}

export default router;

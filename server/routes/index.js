import studentRouter from './student'
import classRouter from '@root/routes/class'
import subjectRouter from '@root/routes/subject'
import locationRouter from '@root/routes/location'
import teacherRouter from '@root/routes/teacher'

const router = (app) => {
  // app.use('/admin', adminRouter)
  app.use('/class', classRouter)
  app.use('/student', studentRouter)
  app.use('/subject', subjectRouter)
  app.use('/teacher', teacherRouter)
  app.use('/location', locationRouter)
}

export default router

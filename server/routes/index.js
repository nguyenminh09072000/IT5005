import studentRouter from './student'

const router = (app) => {
  app.use('/student', studentRouter)
}

export default router

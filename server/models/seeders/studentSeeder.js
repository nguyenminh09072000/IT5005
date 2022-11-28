import Student from '@root/models/Student'
import { logger } from '@root/config/logger'

const studentSeeder = async () => {
  if ((await Student.countDocuments()) !== 0) return
  await Student.insertMany([
    {
      studentId: '20183592',
      studentName: 'Nguyen Nhat Minh  ',
      accountId: '58jdsfkaewradfadf',
      studentBusyTime: [1, 2, 3],
      classes: [
        {
          classId: '105688',
        },
        {
          classId: '105754',
        },
      ],
    },
  ])

  logger.info('Seeding: studentSeeder.js')
}

export default studentSeeder

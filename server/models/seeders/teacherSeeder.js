import Teacher from '@root/models/Teacher'
import { logger } from '@root/config/logger'

const teacherSeeder = async () => {
  if ((await Teacher.countDocuments()) !== 0) return
  await Teacher.insertMany([
    {
      teacherId: '0001',
      teacherName: 'Le Tan Hung',
      accountId: 'asdfasdf',
      teacherBusyTime: [1, 2, 3, 9, 10, 11],
      teacherClasses: [
        {
          classId: '105688',
        },
        {
          classId: '100000',
        },
      ],
    },
    {
      teacherId: '0002',
      teacherName: 'Nguyen Thi Kim Anh',
      accountId: 'sfdcasd',
      teacherBusyTime: [5, 6, 7, 8, 9, 10],
      teacherClasses: [
        {
          classId: '100002',
        },
        {
          classId: '100001',
        },
      ],
    },
  ])

  logger.info('Seeding: teacherSeeder.js')
}

export default teacherSeeder

import Class from '@root/models/Class'
import { logger } from '@root/config/logger'

const classSeeder = async () => {
  if ((await Class.countDocuments()) !== 0) return
  await Class.insertMany([
    {
      classId: '103587',
      subjectId: 'IT3150',
      teacherId: '0001',
      students: [
        {
          studentId: '20183592',
          studentName: 'Nguyen Nhat Minh',
        },
      ],
      locationName: 'TC-101',
      day: 'MONDAY',
      timeStart: 1,
      timeEnd: 3,
    },
    {
      classId: '105688',
      subjectId: 'IT3450',
      teacherId: '0002',
      students: [
        {
          studentId: '20183592',
          studentName: 'Nguyen Nhat Minh',
        },
        {
          studentId: '20183508',
          studentName: 'Pham Vu Dung',
        },
      ],
      locationName: 'TC-101',
      day: 'MONDAY',
      timeStart: 4,
      timeEnd: 6,
    },
  ])

  logger.info('Seeding: classSeeder.js')
}

export default classSeeder

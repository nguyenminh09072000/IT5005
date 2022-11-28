import Subject from '@root/models/Subject'
import { logger } from '@root/config/logger'

const subjectSeeder = async () => {
  if ((await Subject.countDocuments()) !== 0) return
  await Subject.insertMany([
    {
      subjectId: 'IT3150',
      subjectName: 'Computer Architecture',
      credit: 3,
    },
    {
      subjectId: 'IT3450',
      subjectName: 'Football',
      credit: 2,
    },
  ])

  logger.info('Seeding: subjectSeeder.js')
}

export default subjectSeeder

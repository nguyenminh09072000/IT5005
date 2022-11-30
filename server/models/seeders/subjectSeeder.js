import Subject from '@root/models/Subject'
import { logger } from '@root/config/logger'

const subjectSeeder = async () => {
  if ((await Subject.countDocuments()) !== 0) return
  await Subject.insertMany([
    {
      subjectId: 'IT3000',
      subjectName: 'Computer Architecture',
      credit: 2,
    },
    {
      subjectId: 'IT4000',
      subjectName: 'Football',
      credit: 3,
    },
  ])

  logger.info('Seeding: subjectSeeder.js')
}

export default subjectSeeder

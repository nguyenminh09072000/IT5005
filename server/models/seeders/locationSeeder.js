import Location from '@root/models/Location'
import { logger } from '@root/config/logger'

const locationSeeder = async () => {
  if ((await Location.countDocuments()) !== 0) return
  await Location.insertMany([
    {
      locationName: 'TC-101',
      locationBusyTime: [1, 2, 3, 4, 5, 6],
    },
  ])

  logger.info('Seeding: locationSeeder.js')
}

export default locationSeeder

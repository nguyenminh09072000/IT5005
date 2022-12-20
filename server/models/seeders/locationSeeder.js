import Location from '@root/models/Location';
import {logger} from '@root/config/logger';

const locationSeeder = async () => {
    if ((await Location.countDocuments()) !== 0) return;
    await Location.insertMany([
        {
            locationName: 'TC-101',
            locationBusyTime: [],
        },
        {
            locationName: 'TC-102',
            locationBusyTime: [],
        },
    ]);

    logger.info('Seeding: locationSeeder.js');
};

export default locationSeeder;

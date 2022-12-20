import Class from '@root/models/Class';
import {logger} from '@root/config/logger';

const classSeeder = async () => {
    if ((await Class.countDocuments()) !== 0) return;
    await Class.insertMany([]);

    logger.info('Seeding: classSeeder.js');
};

export default classSeeder;

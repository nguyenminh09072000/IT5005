import Teacher from '@root/models/Teacher';
import {logger} from '@root/config/logger';

const teacherSeeder = async () => {
    if ((await Teacher.countDocuments()) !== 0) return;
    await Teacher.insertMany([
        {
            teacherId: '0001',
            teacherName: 'Le Tan Hung',
            username: 'hung.lt@gmail.com',
            teacherBusyTime: [],
        },
        {
            teacherId: '0002',
            teacherName: 'Nguyen Thi Kim Anh',
            username: 'anh.ntk@gmail.com',
            teacherBusyTime: [],
        },
    ]);

    logger.info('Seeding: teacherSeeder.js');
};

export default teacherSeeder;

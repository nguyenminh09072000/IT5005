import Student from '@root/models/Student';
import {logger} from '@root/config/logger';

const studentSeeder = async () => {
    if ((await Student.countDocuments()) !== 0) return;
    await Student.insertMany([
        {
            studentId: '20183592',
            studentName: 'Nguyen Nhat Minh',
            username: 'minh.nn183592@gmail.com',
            birthday: '01-01-2000',
            gender: 'male',
            phone: '012345687',
            studentBusyTime: [],
            classes: [],
        },
    ]);

    logger.info('Seeding: studentSeeder.js');
};

export default studentSeeder;

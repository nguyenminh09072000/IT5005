import Subject from '@root/models/Subject';
import {logger} from '@root/config/logger';

const subjectSeeder = async () => {
    if ((await Subject.countDocuments()) !== 0) return;
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
        {
            subjectId: 'IT1110',
            subjectName: 'Tin học đại cương',
            credit: 4,
        },
        {
            subjectId: 'MI1111',
            subjectName: 'Giải tích I',
            credit: 4,
        },
        {
            subjectId: 'IT4000',
            subjectName: 'Football',
            credit: 3,
        },
        {
            subjectId: 'MI1121',
            subjectName: 'Giải tích II',
            credit: 3,
        },
        {
            subjectId: 'MI1131',
            subjectName: 'Giải tích III',
            credit: 3,
        },
        {
            subjectId: 'MI1141',
            subjectName: 'Đại số',
            credit: 4,
        },
    ]);

    logger.info('Seeding: subjectSeeder.js');
};

export default subjectSeeder;

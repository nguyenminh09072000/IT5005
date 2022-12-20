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
            subjectId: 'IT1000',
            subjectName: 'Tin học đại cương',
            credit: 4,
        },
        {
            subjectId: 'MI1111',
            subjectName: 'Giải tích I',
            credit: 4,
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
        {
            subjectId: 'MI2020',
            subjectName: 'Xác suất thống kê',
            credit: 3,
        },
        {
            subjectId: 'IT3020',
            subjectName: 'Toán rời rạc',
            credit: 3,
        },
        {
            subjectId: 'MI3052',
            subjectName: 'Nhập môn các phương pháp tối ưu',
            credit: 2,
        },
        {
            subjectId: 'PH1110',
            subjectName: 'Vật lý đại cương I',
            credit: 3,
        },
        {
            subjectId: 'PH1120',
            subjectName: 'Vật lý đại cương II',
            credit: 3,
        },
    ]);

    logger.info('Seeding: subjectSeeder.js');
};

export default subjectSeeder;

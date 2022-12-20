import subjectSeeder from '@root/models/seeders/subjectSeeder';
import locationSeeder from '@root/models/seeders/locationSeeder';
import mongooseConnection from '@root/config/mongo';
import teacherSeeder from '@root/models/seeders/teacherSeeder';
import studentSeeder from '@root/models/seeders/studentSeeder';
import classSeeder from '@root/models/seeders/classSeeder';
import accountSeeder from '@root/models/seeders/accountSeeder';
import {logger} from '@root/config/logger';

const seed = async () => {
    try {
        await subjectSeeder();
        await locationSeeder();
        await teacherSeeder();
        await studentSeeder();
        // await classSeeder()
        await accountSeeder();

        await mongooseConnection.close();
    } catch (error) {
        logger.info(error);
    }
};

seed();

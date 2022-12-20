import Account from '@root/models/Account';
import {logger} from '@root/config/logger';

const accountSeeder = async () => {
    if ((await Account.countDocuments()) !== 0) return;
    await Account.insertMany([
        {
            username: 'minh.nn183592@gmail.com',
            password:
                '$argon2i$v=19$m=4096,t=3,p=1$SkxHdHRGYk1pQzNFTWxHWQ$LUWXr24knpusXx+2Cq1t7D/X84YbIvcv40mmJjTwbLg',
            role: 'student',
        },
        {
            username: 'hung.lt@gmail.com',
            password:
                '$argon2i$v=19$m=4096,t=3,p=1$SkxHdHRGYk1pQzNFTWxHWQ$LUWXr24knpusXx+2Cq1t7D/X84YbIvcv40mmJjTwbLg',
            role: 'teacher',
        },
        {
            username: 'anh.ntk@gmail.com',
            password:
                '$argon2i$v=19$m=4096,t=3,p=1$SkxHdHRGYk1pQzNFTWxHWQ$LUWXr24knpusXx+2Cq1t7D/X84YbIvcv40mmJjTwbLg',
            role: 'teacher',
        },
        {
            username: 'admin@gmail.com',
            password:
                '$argon2i$v=19$m=4096,t=3,p=1$SkxHdHRGYk1pQzNFTWxHWQ$LUWXr24knpusXx+2Cq1t7D/X84YbIvcv40mmJjTwbLg',
            role: 'admin',
        },
    ]);

    logger.info('Seeding: accountSeeder.js');
};

export default accountSeeder;

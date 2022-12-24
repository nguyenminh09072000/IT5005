import express from 'express';
import cors from 'cors';
import router from '@root/routes/index';
import {HTTP_STATUS} from '@root/utils/constant';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

router(app);

app.use((error, req, res, next) => {
    console.log(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
    });
});

app.listen(port, () => {
    console.log(`Listening: http://${host}:${port}`);
});

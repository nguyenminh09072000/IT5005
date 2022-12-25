import mongoose from 'mongoose';
import db from '@root/config/mongo';

const Student = new mongoose.Schema(
    {
        studentId: {type: String, required: true, unique: true},
        studentName: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        birthday: {type: String, required: true},
        gender: {type: String, required: true},
        phone: {type: String, required: true, unique: true},
        studentBusyTime: {type: Array},
        classes: {type: Array},
    },
    {timestamps: true}
);

export default db.model('Student', Student, 'Student');

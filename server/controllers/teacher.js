import {
    createNewTeacher,
    findAndDeleteTeacher,
    findListTeacher,
    findTeacher,
    findTeacherAndUpdate,
} from '@root/repository/teacherRepository';
import {findClass} from '@root/repository/classRepository';
import {ROLES} from '@root/utils/constant';
import {findListStudent} from '@root/repository/studentRepository';

export const getTeacher = async (req, res) => {
    try {
        const {teacherId} = req.query;
        const teacher = await findTeacher({teacherId});
        return res.json(teacher);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getTeacherInfo = async (req, res) => {
    try {
        const {username} = req.body;
        const data = await findTeacher({username});
        console.log(data);
        return res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateTeacher = async (req, res) => {
    try {
        const {teacherId, updateInfo} = req.body;
        const {role} = req;
        if (role === ROLES.STUDENT) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({message: 'Invalid role'});
        }
        const teacher = await findTeacherAndUpdate({teacherId}, updateInfo, {new: true});
        return res.json(teacher);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createTeacher = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({message: 'Invalid role'});
        }
        const {teacherId, teacherName, username, birthday, gender, phone} = req.body;
        const teacher = await createNewTeacher([
            {teacherId, teacherName, username, birthday, gender, phone},
        ]);
        return res.json(teacher);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteTeacher = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({message: 'Invalid role'});
        }
        const {teacherId} = req.body;
        await findAndDeleteTeacher({teacherId});
        return res.json({message: 'Deleted'});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getTeacherClassList = async (req, res) => {
    try {
        const {teacherId} = req.body;
        const classList = await findClass({teacherId});
        console.log(classList);
        return res.json(classList);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllTeacher = async (req, res) => {
    try {
        const data = await findListTeacher();
        return res.json({data});
    } catch (error) {
        res.status(500).json(error);
    }
};

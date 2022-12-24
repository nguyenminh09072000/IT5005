import {
    createNewTeacher,
    findAndDeleteTeacher,
    findTeacher,
    findTeacherAndUpdate,
} from '@root/repository/teacherRepository';
import {findClass} from '@root/repository/classRepository';
import {ROLES} from '@root/utils/constant';

export const getTeacher = async (req, res) => {
    try {
        const {teacherId} = req.body;
        const teacher = await findTeacher({teacherId});
        // console.log(teacher);
        return res.json(teacher);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateTeacher = async (req, res) => {
    try {
        const {teacherId, updateInfo} = req.body;
        const {role} = req;
        if (role === ROLES.STUDENT) {
            return res.json({message: 'Invalid role'});
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
            return res.json({message: 'Invalid role'});
        }
        const {teacherId, teacherName, username} = req.body;
        const teacher = await createNewTeacher([{teacherId, teacherName, username}]);
        console.log('Teacher add ' + teacher);
        return res.json(teacher);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteTeacher = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.json({message: 'Invalid role'});
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
        return res.json(classList);
    } catch (error) {
        res.status(500).json(error);
    }
};

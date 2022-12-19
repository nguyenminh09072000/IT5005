import {
    createNewClass,
    findAndDeleteClass,
    findClass,
    findClassAndUpdate,
} from '@root/repository/classRepository';
import {findStudentAndUpdate} from '@root/repository/studentRepository';
import {ROLES} from '@root/utils/constant';

export const getClass = async (req, res) => {
    try {
        const {classId} = req.query;
        const classInfo = await findClass({classId});
        return res.json(classInfo);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateClass = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.json({message: 'Invalid role'});
        }
        const {classId, updateInfo} = req.body;
        await findClassAndUpdate({classId}, updateInfo);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createClass = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.json({message: 'Invalid role'});
        }
        const {classId, subjectId, teacherId, locationName, classBusyTime, maxSlot} = req.body;
        const students = [];
        const newClass = await createNewClass([
            {classId, subjectId, teacherId, locationName, classBusyTime, students, maxSlot},
        ]);
        return res.json(newClass);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteClass = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.json({message: 'Invalid role'});
        }
        const {classId} = req.body;
        await findAndDeleteClass({classId});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getStudentOfClass = async (req, res) => {
    try {
        const {classId} = req.body;
        const classInfo = await findClass({classId});
        const studentList = classInfo[0].students;
        return res.json(studentList);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const setScore = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.TEACHER) {
            return res.json({message: 'Invalid role'});
        }
        const {studentId, classId, score} = req.body;
        const studentScore = await findClassAndUpdate(
            {classId, 'students.studentId': studentId},
            {
                $set: {
                    'students.$.midterm': score.midterm,
                    'students.$.final': score.final,
                },
            }
        );
        if (!studentScore) {
            return res.json({message: 'Invalid student'});
        }
        return res.json({message: 'Successful'});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteStudentFromClass = async (req, res) => {
    try {
        const {studentId, classId} = req.body;
        const classInfo = await findClass({classId});
        const studentList = classInfo[0].students;

        const newStudentList = [];
        studentList.map(ele => {
            if (ele.studentId !== studentId) newStudentList.push(ele);
        });
        await findClassAndUpdate({classId}, {students: newStudentList});

        await findStudentAndUpdate({studentId}, {$pull: {studentClasses: classId}});
        return res.json({message: 'Successfully delete student'});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const addStudentToClass = async (req, res) => {
    try {
        const {studentId, classId} = req.body;
        const classInfo = await findClass({classId});
        const studentList = classInfo[0].students;

        if (studentList.length >= classInfo[0].maxSlot) {
            return res.json({message: 'Class is full'});
        }

        studentList.forEach(ele => {
            if (ele.studentId === studentId) {
                return res.json({message: 'Student have already been in class'});
            }
        });
        studentList.push({studentId, midterm: 0, final: 0});
        const updateStudent = await findStudentAndUpdate({studentId}, {$push: {classes: classId}});
        if (!updateStudent) {
            return res.json({message: 'Invalid student'});
        }
        await findClassAndUpdate({classId}, {students: studentList});

        return res.json({message: 'Successfully add student to class'});
    } catch (error) {
        res.status(500).json(error);
    }
};

import {
    createNewStudent,
    findAndDeleteStudent,
    findListStudent,
    findStudent,
    findStudentAndUpdate,
} from '@root/repository/studentRepository';
import {findClass} from '@root/repository/classRepository';
import {ROLES} from '@root/utils/constant';

export const getStudent = async (req, res) => {
    try {
        const {role} = req;
        if (role === ROLES.TEACHER) {
            return res.json({message: 'Invalid role'});
        }
        const {studentId} = req.query;
        const filter = {studentId};
        const student = await findStudent(filter);
        return res.json(student);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateStudent = async (req, res) => {
    try {
        const {role} = req;
        if (role === ROLES.TEACHER) {
            return res.json({message: 'Invalid role'});
        }
        const {studentId, studentName, birthday, gender, phone} = req.body;

        let data = {};
        if (studentName) data.studentName = studentName;
        if (birthday) data.birthday = birthday;
        if (gender) data.gender = gender;
        if (phone) data.phone = phone;

        const student = await findStudentAndUpdate({studentId}, data, {new: true});
        return res.json(student);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createStudent = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.json({message: 'Invalid role'});
        }
        const {studentId, studentName, username, birthday, gender, phone} = req.body;
        const student = await createNewStudent([
            {studentId, studentName, username, birthday, gender, phone},
        ]);
        return res.json(student);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const {studentId} = req.body;
        await findAndDeleteStudent({studentId});
        return res.json({message: 'Deleted'});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getStudentClassList = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.json({message: 'Invalid role'});
        }
        const {studentId} = req.body;
        const student = await findStudent({studentId});

        const classIDs = student.classes;
        const classList = [];

        for (const ele of classIDs) {
            const classInfo = await findClass({classId: ele});

            if (classInfo.length) {
                const classStudent = classInfo[0].students;
                const studentInClass = classStudent.filter(
                    element => element.studentId === studentId
                );
                classList.push({
                    classId: ele,
                    subjectId: classInfo[0].subjectId,
                    subjectName: classInfo[0].subjectName,
                    midterm: studentInClass[0].midterm,
                    final: studentInClass[0].final,
                    locationName: classInfo[0].locationName,
                    classBusyTime: classInfo[0].classBusyTime,
                });
            }
        }
        return res.json(classList);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllStudent = async (req, res) => {
    try {
        const studentList = await findListStudent();
        return res.json({studentList});
    } catch (error) {
        res.status(500).json(error);
    }
};

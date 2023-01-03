import {
    createNewClass,
    findAndDeleteClass,
    findClass,
    findClassAndUpdate,
} from '@root/repository/classRepository';
import {findStudent, findStudentAndUpdate} from '@root/repository/studentRepository';
import {HTTP_STATUS, ROLES} from '@root/utils/constant';
import {findTeacher, findTeacherAndUpdate} from '@root/repository/teacherRepository';
import {findLocationAndUpdate, getLocationList} from '@root/repository/locationRepository';

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
            return res.status(HTTP_STATUS.FORBIDDEN).json({message: 'Invalid role'});
        }
        const {classId, updateInfo} = req.body;
        await findClassAndUpdate({classId}, updateInfo);
        return res.json({message: 'Successful'});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createClass = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({message: 'Invalid role'});
        }
        const {classId, subjectId, teacherId, locationName, classBusyTime, maxSlot} = req.body;
        const students = [];

        const teacher = await findTeacher({teacherId});
        if (!teacher) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message: 'Invalid input'});
        }

        let {teacherBusyTime} = teacher;
        let isTeacherBusy = false;
        classBusyTime.forEach(ele => {
            if (teacherBusyTime.includes(ele)) {
                isTeacherBusy = true;
            }
        });
        if (isTeacherBusy) return res.json({message: 'Teacher is not available'});

        const location = await getLocationList({locationName});

        let {locationBusyTime} = location[0];
        let isLocationBusy = false;
        classBusyTime.forEach(ele => {
            if (locationBusyTime.includes(ele)) isLocationBusy = true;
        });
        if (isLocationBusy) return res.json({message: 'Location is not available'});

        const newClass = await createNewClass([
            {classId, subjectId, teacherId, locationName, classBusyTime, students, maxSlot},
        ]);

        teacherBusyTime = teacherBusyTime.concat(classBusyTime);
        teacherBusyTime = teacherBusyTime.sort(function (a, b) {
            return a - b;
        });
        await findTeacherAndUpdate(
            {teacherId},
            {teacherBusyTime, $push: {teacherClasses: classId}}
        );

        locationBusyTime = locationBusyTime.concat(classBusyTime);
        locationBusyTime = locationBusyTime.sort(function (a, b) {
            return a - b;
        });

        await findLocationAndUpdate({locationName}, {locationBusyTime});

        return res.json(newClass);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteClass = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({message: 'Invalid role'});
        }
        const {classId} = req.body;
        const classInfo = await findClass({classId});
        await findAndDeleteClass({classId});

        // TODO: update studentBusyTime and studentClasses

        const studentList = classInfo[0].students;
        const {classBusyTime} = classInfo[0];
        for (const studentInClass of studentList) {
            const student = await findStudent({studentId: studentInClass.studentId});
            let {studentBusyTime} = student;
            classBusyTime.forEach(ele => {
                const index = studentBusyTime.indexOf(ele);
                if (index > -1) {
                    studentBusyTime.splice(index, 1);
                }
            });

            await findStudentAndUpdate(
                {studentId: studentInClass.studentId},
                {studentBusyTime, $pull: {classes: classId}}
            );
        }
        // TODO: update teacherBusyTime
        const teacher = await findTeacher({teacherId: classInfo[0].teacherId});
        let {teacherBusyTime} = teacher;
        classBusyTime.forEach(ele => {
            const index = teacherBusyTime.indexOf(ele);
            if (index > -1) {
                teacherBusyTime.splice(index, 1);
            }
        });
        await findTeacherAndUpdate({teacherId: classInfo[0].teacherId}, {teacherBusyTime});

        // TODO: update locationBusyTime
        const location = await getLocationList({locationName: classInfo[0].locationName});
        let {locationBusyTime} = location[0];
        classBusyTime.forEach(ele => {
            const index = locationBusyTime.indexOf(ele);
            if (index > -1) {
                locationBusyTime.splice(index, 1);
            }
        });
        await findLocationAndUpdate({locationName: classInfo[0].locationName}, {locationBusyTime});

        return res.json({message: 'Successful'});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getStudentOfClass = async (req, res) => {
    try {
        const {classId} = req.body;
        const classInfo = await findClass({classId});
        const data = classInfo[0].students;
        return res.json({data});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const setScore = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.TEACHER) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({message: 'Invalid role'});
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
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message: 'Invalid student'});
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

        const student = await findStudent({studentId});
        let {studentBusyTime} = student;
        const {classBusyTime} = classInfo[0];
        classBusyTime.forEach(ele => {
            const index = studentBusyTime.indexOf(ele);
            if (index > -1) {
                studentBusyTime.splice(index, 1);
            }
        });

        const newStudentList = [];
        studentList.map(ele => {
            if (ele.studentId !== studentId) newStudentList.push(ele);
        });
        await findClassAndUpdate({classId}, {students: newStudentList});

        await findStudentAndUpdate({studentId}, {studentBusyTime, $pull: {classes: classId}});
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
        const student = await findStudent({studentId});

        if (studentList.length >= classInfo[0].maxSlot) {
            return res.json({message: 'Class is full'});
        }
        let isStudentInClass = false;
        studentList.forEach(ele => {
            if (ele.studentId === studentId) {
                isStudentInClass = true;
            }
        });
        if (isStudentInClass) {
            return res.json({message: 'Student have already been in class'});
        }
        studentList.push({studentId, studentName: student.studentName, midterm: 0, final: 0});

        const {classBusyTime} = classInfo[0];
        let {studentBusyTime} = student;
        let isStudentBusy = false;
        classBusyTime.forEach(ele => {
            if (studentBusyTime.includes(ele)) {
                isStudentBusy = true;
            }
        });
        if (isStudentBusy) {
            return res.json({message: 'Student not available'});
        }

        studentBusyTime = studentBusyTime.concat(classBusyTime);
        studentBusyTime = studentBusyTime.sort(function (a, b) {
            return a - b;
        });
        const updateStudent = await findStudentAndUpdate(
            {studentId},
            {studentBusyTime, $push: {classes: classId}}
        );
        if (!updateStudent) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message: 'Invalid student'});
        }
        await findClassAndUpdate({classId}, {students: studentList});

        return res.json({message: 'Successfully add student to class'});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllClass = async (req, res) => {
    try {
        const data = await findClass();
        return res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

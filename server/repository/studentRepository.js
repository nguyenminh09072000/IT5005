import Student from '@root/models/Student';

export const findStudent = filter => Student.findOne(filter);

export const findStudentAndUpdate = (filter, data, options) =>
    Student.findOneAndUpdate(filter, data, options);

export const findAndDeleteStudent = filter => Student.deleteOne(filter);

export const createNewStudent = data => Student.create(data);

export const findListStudent = filter => Student.find(filter);

import Student from '@root/models/Student'

export const findStudent = (filter) => Student.findOne(filter)

export const findStudentAndUpdate = (filter, data, options) => Student.findOneAndUpdate(filter, data, options)

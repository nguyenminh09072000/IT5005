import Teacher from '@root/models/Teacher'

export const findTeacher = (filter) => Teacher.findOne(filter)

export const findTeacherAndUpdate = (filter, data, options) => Teacher.findOneAndUpdate(filter, data, options)

export const findAndDeleteTeacher = (filter, options) => Teacher.deleteOne(filter, options)

export const createNewTeacher = (data) => Teacher.create(data)

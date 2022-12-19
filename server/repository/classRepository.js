import Class from '@root/models/Class'

export const createNewClass = (data) => Class.create(data)

export const findClass = (filter) => Class.findOne(filter)

export const findClassAndUpdate = (filter, data, options) => Class.findOneAndUpdate(filter, data, options)

export const findAndDeleteClass = (filter) => Class.deleteOne(filter)

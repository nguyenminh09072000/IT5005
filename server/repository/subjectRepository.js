import Subject from '@root/models/Subject';

export const findSubject = filter => Subject.findOne(filter);

export const findSubjectAndUpdate = (filter, data, options) =>
    Subject.findOneAndUpdate(filter, data, options);

export const createNewSubject = data => Subject.create(data);

export const findAndDeleteSubject = filter => Subject.deleteOne(filter);

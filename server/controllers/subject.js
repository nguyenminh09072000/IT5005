import {
    findSubject,
    createNewSubject,
    findSubjectAndUpdate,
    findAndDeleteSubject,
} from '@root/repository/subjectRepository';
import {ROLES} from '@root/utils/constant';

export const getSubject = async (req, res) => {
    try {
        const {subjectId} = req.query;
        const subject = await findSubject({subjectId});
        return res.json(subject);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateSubject = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.json({message: 'Invalid role'});
        }
        const {subjectId, subjectName, credit} = req.body;
        const subject = await findSubjectAndUpdate({subjectId}, {subjectName, credit}, {new: true});
        return res.json(subject);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createSubject = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.json({message: 'Invalid role'});
        }
        const {subjectId, subjectName, credit} = req.body;
        const subject = await createNewSubject([{subjectId, subjectName, credit}]);
        return res.json(subject);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteSubject = async (req, res) => {
    try {
        const {role} = req;
        if (role !== ROLES.ADMIN) {
            return res.json({message: 'Invalid role'});
        }
        const {subjectId} = req.body;
        await findAndDeleteSubject({subjectId});
        return res.json({message: 'Deleted'});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllSubject = async (req, res) => {
    try {
        const data = await findSubject();
        return res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

import {
    findSubject,
    createNewSubject,
    findSubjectAndUpdate,
    deleteSubject
} from '@root/repository/subjectRepository';

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
        const {subjectId, subjectName, credit} = req.body;
        const subject = await findSubjectAndUpdate({subjectId}, {subjectName, credit}, {new: true});
        return res.json(subject);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createSubject = async (req, res) => {
    try {
        const {subjectId, subjectName, credit} = req.body;
        const subject = await createNewSubject([{subjectId, subjectName, credit}]);
        return res.json(subject);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteSubject = async (req, res) => {
    try {
        const {subjectId} = req.body;
        await deleteSubject({subjectId});
        return res.json({message: 'Deleted'});
    } catch (error) {
        res.status(500).json(error);
    }
};

import { createNewStudent, findStudentAndUpdate } from '@root/repository/studentRepository'
import { findAndDeleteTeacher, findTeacher } from '@root/repository/teacherRepository'

export const getTeacher = async (req, res) => {
  try {
    const { teacherId } = req.query
    const filter = { teacherId }
    const teacher = await findTeacher(filter)
    return res.json(teacher)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateTeacher = async (req, res) => {
  try {
    const { teacherId, updateInfo } = req.body
    const teacher = await findStudentAndUpdate({ teacherId }, updateInfo, { new: true })
    return res.json(teacher)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createTeacher = async (req, res) => {
  try {
    const { teacherId, teacherName, accountId } = req.body
    const teacher = await createNewStudent([{ teacherId }, { teacherName }, { accountId }])
    return res.json(teacher)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteTeacher = async (req, res) => {
  try {
    const { teacherId } = req.body
    await findAndDeleteTeacher({ teacherId })
    return res.json({ message: 'Deleted' })
  } catch (error) {
    res.status(500).json(error)
  }
}

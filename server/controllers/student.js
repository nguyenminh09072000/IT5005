import { findStudent, findStudentAndUpdate } from '@root/repository/studentRepository'

export const getStudent = async (req, res) => {
  try {
    const { studentId } = req.query
    const filter = { studentId }
    const student = await findStudent(filter)
    return res.json(student)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateStudent = async (req, res) => {
  try {
    const { studentId, studentName } = req.body
    const student = await findStudentAndUpdate({ studentId }, { studentName }, { new: true })
    return res.json(student)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createStudent = async (req, res) => {}

export const deleteStudent = async (req, res) => {}

export const getStudentClassList = async (req, res) => {}

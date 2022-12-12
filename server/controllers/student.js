import {
  createNewStudent,
  findAndDeleteStudent,
  findStudent,
  findStudentAndUpdate,
} from '@root/repository/studentRepository'
import { findClass } from '@root/repository/classRepository'

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

export const createStudent = async (req, res) => {
  try {
    const { studentId, studentName, accountId } = req.body
    const student = await createNewStudent([{ studentId }, { studentName }, { accountId }])
    return res.json(student)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.body
    await findAndDeleteStudent({ studentId })
    return res.json({ message: 'Deleted' })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getStudentClassList = async (req, res) => {
  try {
    const { studentId } = req.body
    const student = await findStudent({ studentId })
    const classIDs = student.studentClasses
    const classList = []
    for (const ele of classIDs) {
      const classInfo = await findClass({ classId: ele })
      const classStudent = classInfo.students
      const studentInClass = classStudent.filter((student) => student.studentId === studentId)
      classList.push({
        classId: ele,
        subjectId: classInfo.subjectId,
        subjectName: classInfo.subjectName,
        midterm: studentInClass[0].midterm,
        final: studentInClass[0].final,
        locationName: classInfo.locationName,
        classBusyTime: classInfo.classBusyTime,
      })
    }
    return res.json(classList)
  } catch (error) {
    res.status(500).json(error)
  }
}

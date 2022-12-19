import { createNewClass, findAndDeleteClass, findClass, findClassAndUpdate } from '@root/repository/classRepository'
import { createNewStudent } from '@root/repository/studentRepository'

export const getClass = async (req, res) => {
  try {
    const { classId } = req.query
    const classInfo = await findClass({ classId })
    return res.json(classInfo)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateClass = async (req, res) => {
  try {
    const { classId, updateInfo } = req.body
    await findClassAndUpdate({ classId }, updateInfo)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createClass = async (req, res) => {
  try {
    const { classId, subjectId, teacherId, locationName, classBusyTime } = req.body
    const students = []
    const newClass = await createNewClass([{ classId, subjectId, teacherId, locationName, classBusyTime, students }])
    return res.json(newClass)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteClass = async (req, res) => {
  try {
    const { classId } = req.body
    await findAndDeleteClass({ classId })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getStudentOfClass = async (req, res) => {
  try {
    const { classId } = req.query
    const classInfo = await findClass({ classId })
    const studentList = classInfo.students
    return res.json(studentList)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const setScore = async (req, res) => {
  try {
    const { studentId, classId, score } = req.body
    const studentScore = await findClassAndUpdate(
      { classId, 'students.studentId': studentId },
      {
        $set: {
          'students.$.midterm': score.midterm,
          'students.$.final': score.final,
        },
      }
    )
    return res.json({ message: 'Successful' })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteStudentFromClass = async (req, res) => {
  try {
    const { studentId, classId } = req.body
    const classInfo = await findClass({ classId })
    const studentList = classInfo.students
    const newStudentList = []
    studentList.map((ele) => {
      if (ele.studentId !== studentId) newStudentList.push(ele)
    })
    await findClassAndUpdate({ classId }, { students: newStudentList })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const addStudentToClass = async (req, res) => {
  try {
    const { studentId, classId } = req.body
    const classInfo = await findClass({ classId })
    const studentList = classInfo.students
    studentList.push({ studentId, midterm: 0, final: 0 })
    await findClassAndUpdate({ classId }, { students: studentList })
  } catch (error) {
    res.status(500).json(error)
  }
}

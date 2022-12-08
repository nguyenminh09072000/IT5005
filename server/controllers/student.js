import {
  createNewStudent,
  findAndDeleteStudent,
  findStudent,
  findStudentAndUpdate,
} from '@root/repository/studentRepository'

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
    const studentClassList = student.studentClasses
    return res.json(studentClassList)
  } catch (error) {
    res.status(500).json(error)
  }
}

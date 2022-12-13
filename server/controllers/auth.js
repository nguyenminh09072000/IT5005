import Account from '../models/Account.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { httpStatus, apiStatus } from '../constants/index.js'
import { validationResult } from 'express-validator'

export const getAuth = (req, res) => {
  res.send('ROUTER SUCCESS')
}

export const Register = async (req, res) => {
  const { username, password, role } = req.body
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing email or password' })
  }
  try {
    const user = await Account.findOne({ username })
    if (user) return res.status(400).json({ success: false, message: 'User existed' })

    const hashPassword = await argon2.hash(password)
    const newUser = new Account({
      username,
      password: hashPassword,
      role,
    })
    await newUser.save()

    const accessToken = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY)
    return res.json({
      success: true,
      message: 'User created succesfully',
      accessToken,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export const Login = async (req, res) => {
  const { username, password, role } = req.body
  if (!username || !password) return res.status(400).json({ success: false, message: 'Missing email or password' })
  try {
    const user = await Account.findOne({ username })
    if (!user) return res.status(400).json({ success: false, message: 'incorrect email' })
    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid) return res.status(400).json({ success: false, message: 'incorrect password' })

    if (role !== user.role) return res.status(400).json({ success: false, message: `not found ${role} account ` })

    const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
    return res.json({
      success: true,
      message: 'Login succesfully',
      accessToken,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export const Delete = async (req, res) => {
  const { username } = req.params
  const user = await Account.findOneAndDelete({ username })
  if (user) {
    res.status(200).json({ success: true, message: `delete ${username}` })
  } else {
    res.status(400).json({ success: false, message: 'error found' })
  }
}

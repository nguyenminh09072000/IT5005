import Account from '../models/Account.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const registerAccount = async (req, res) => {
    const {username, password, role} = req.body;
    if (!username || !password) {
        return res.status(400).json({success: false, message: 'Missing email or password'});
    }
    try {
        const user = await Account.findOne({username});
        if (user) return res.status(400).json({success: false, message: 'User existed'});

        const hashPassword = await argon2.hash(password);
        const newUser = new Account({
            username,
            password: hashPassword,
            role,
        });
        await newUser.save();
        const accessToken = jwt.sign({username: username, role: role}, process.env.SECRET_KEY);
        return res.json({
            success: true,
            message: 'User created successfully',
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const login = async (req, res) => {
    const {username, password, role} = req.body;
    // console.log(username + password + role);
    if (!username || !password) {
        return res.status(400).json({success: false, message: 'Missing username or password'});
    }

    try {
        const user = await Account.findOne({username});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username',
            });
        }
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password',
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                success: false,
                message: `Not found ${role} account `,
            });
        }

        const accessToken = jwt.sign({username: username, role: role}, process.env.SECRET_KEY);
        return res.json({
            success: true,
            message: 'Login successfully',
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const deleteAccount = async (req, res) => {
    const {username} = req.params;
    const user = await Account.findOneAndDelete({username});
    if (user) {
        res.status(200).json({success: true, message: `Delete ${username} successfully`});
    } else {
        res.status(400).json({success: false, message: 'Delete failed'});
    }
};

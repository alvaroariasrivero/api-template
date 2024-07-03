const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const regex = require('../utils/regex');
const saltRounds = 10;

const signUpUser = async(req, res) => {
    let data;
    try {
        const {email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const existEmail = await User.findOne({'email': email});
        if(regex.validateEmail(email) && regex.validatePassword(password) && !existEmail){
            data = await User.create({'email': email, 'password': hashPassword, 'logged': false, 'isAdmin': false});
            res.status(201).json(data);
        }else{
            res.status(400).json({msg: 'Invalid email or password'});
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async(req, res) => {
    let data;
    try {
        const {email, password} = req.body
        data = await User.findOne({'email': email}, '-_id -__v');
        if(!data){
            res.status(400).json({ msg: 'Incorrect user or password'}); 
        }else{
            const match = await bcrypt.compare(password, data.password);
            if(match){
                await User.updateOne({ 'email': email }, { logged: true })
                const {email} = data;
                const userForToken = {
                    email: email,
                };
                const token = jwt.sign(userForToken, jwt_secret, {expiresIn: '20m'});
                res
                .status(200)
                .json({
                    msg:'Correct authentication',
                    token: token
                });
            }else {
                res.status(400).json({ msg: 'Incorrect user or password'});
            }
        }        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const logoutUser = async (req, res) => {
    let data;
    try {
        const {email} = req.body;
        data = await User.findOne({'email': email}, '-_id -__v');
        if(!data){
            res.status(400).json({ msg: 'No found user'});
        }
        await User.updateOne({'email': email}, {'logged': false});
        res.status(200).json({ msg: 'Logout successful' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const user = {
    signUpUser,
    loginUser,
    logoutUser
};

module.exports = user;
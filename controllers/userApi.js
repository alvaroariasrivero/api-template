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
            data = await User.create({'email': email, 'password': hashPassword, 'logged': false});
            res.status(201).json(data);
        }else{
            res.status(400).json({msg: 'Invalid email or password'});
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

const user = {
    signUpUser
};

module.exports = user;
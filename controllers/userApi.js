const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const saltRounds = 10;

const signUpUser = async(req, res) => {
  let data;
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const existEmail = await User.findOne({'email': email});
    if(regex.validateEmail(email) && regex.validatePassword(password) && !existEmail){
      data = await User.create({'email': email, 'password': hashPassword, 'logged': false, 'isAdmin': false, 'firstTime': true});
      res.status(201).json(data);
    }else{
      res.status(400).json({msg: 'Invalid email or password'});
    }
  } catch (error) {
    console.log('Error in signUpUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async(req, res) => {
  let data;
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email is required' });
    }
    data = await User.findOne({'email': email}, '-_id -__v');
    if(!data){
        res.status(400).json({ msg: 'Incorrect user or password'}); 
    }else{
      const match = await bcrypt.compare(password, data.password);
      if(match){
        await User.updateOne({ 'email': req.body.email }, { logged: true })
        const {email} = data;
        const userForToken = {
          email: email,
        };
        const token = jwt.sign(userForToken, jwt_secret, {expiresIn: '20m'});
        res
        .status(200)
        .json({
          msg:'Correct authentication',
          token: token,
          firstTime: data.firstTime
        });
      }else {
        res.status(400).json({ msg: 'Incorrect user or password'});
      }
    }        
  } catch (error) {
    console.log('Error in loginUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logoutUser = async (req, res) => {
  let data;
  try {
    const {email} = req.body;
    if (!email) {
      return res.status(400).json({ msg: 'Email is required' });
    }
    data = await User.findOne({'email': email}, '-_id -__v');
    if(!data){
        res.status(400).json({ msg: 'No found user'});
    }
    await User.updateOne({'email': email}, {'logged': false});
    res.status(200).json({ msg: 'Logout successful' });
  } catch (error) {
    console.log('Error in logouUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  let data;
  try {
    const {newPassword, email} = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ msg: 'Email and newpassword are required' });
    }
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    data = await User.findOne({'email': email}, '-_id -__v');
    if(!data){
      res.status(400).json({ msg: 'No found user'});
    }
    if(data.firstTime === true){
      await User.updateOne({ email: email }, {'password': hashPassword, 'firstTime': false});
    }else{
      await User.updateOne({ email: email }, {'password': hashPassword});
    }
    res.status(200).json({ msg: 'Password changed' });
  } catch (error) {
    console.log('Error in updateUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const removeUser = async (req, res) => {
  let data;
  try {
    const {email} = req.body;
    if (!email) {
      return res.status(400).json({ msg: 'Email is required' });
    }
    data = await User.findOne({'email': email}, '-_id -__v');
    if(!data){
      res.status(400).json({ msg: 'No found user'});
    }
    await User.deleteOne({'email': email});
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.log('Error in removeUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const user = {
  signUpUser,
  loginUser,
  logoutUser,
  updateUser,
  removeUser
};

module.exports = user;
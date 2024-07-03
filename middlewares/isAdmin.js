const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const adminRoutes = express.Router();

adminRoutes.use((req, res, next) => {
  const token = req.headers['access_token'];
  if (token) {
    jwt.verify(token, jwt_secret, async (err, decoded) => {
      let data = await User.findOne({"email": decoded.email}, '-_id -__v');
      if (data.isAdmin == true) {
        req.decoded = decoded;    
        next();
      } else {
        return res.json({ msg: 'Invalid token' });
      }
    });
  } else {
    res.send({ 
        msg: 'Token not provided' 
    });
  }
});

module.exports = adminRoutes;
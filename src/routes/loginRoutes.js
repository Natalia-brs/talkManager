const express = require('express');
const generateToken = require('../token/token');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const routerLogin = express.Router();

const STATUS_OK = 200;

routerLogin.post('/', 
 validateEmail, 
 validatePassword,
 (_req, res) => {
   const createdToken = generateToken();
   res.status(STATUS_OK).json({ token: createdToken });
});

module.exports = routerLogin;
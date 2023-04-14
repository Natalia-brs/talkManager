const express = require('express');
const generateToken = require('../token/token');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const routerLogin = express.Router();

const STATUS_OK = 200;
const SERVER_ERROR = 500;

routerLogin.post('/', 
 validateEmail, 
 validatePassword,
 (_req, res) => {
  try {
    const createdToken = generateToken();
    res.status(STATUS_OK).json({ token: createdToken });
  } catch (error) {
    res.status(SERVER_ERROR).send({ message: error.message });
  }
});

module.exports = routerLogin;
const express = require('express');
const generateToken = require('../token/token');

const routerLogin = express.Router();

const STATUS_OK = 200;

routerLogin.post('/', (req, res) => {
   const createdToken = generateToken();
   res.status(STATUS_OK).json({ token: createdToken });
});

module.exports = routerLogin;
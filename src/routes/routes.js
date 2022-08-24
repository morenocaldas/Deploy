const express = require('express');
const { registerUser, login, editUser } = require('../controller/userController');
const loginFilter = require('../filters/login');
const checkToken = require('../filters/token');

const route = express();

//cadastro do usuario
route.post('/userController', registerUser);

//login do usuário
route.post('/login', login);

//checar login
route.use(loginFilter)

//validacão de token
//route.use(checkToken);

// edição do usuário logado
route.patch('/editUser', editUser);


module.exports = route;

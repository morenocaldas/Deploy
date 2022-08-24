const express = require('express');
const { application } = require('express');
const routes = express();
const { addClient, getClients, attClient, deleteClient } = require('./controllers/clients');
const idExists = require('./middlewares/idExists');


//USERS
// routes.use(VERIFY TOKEN MIDDLEWARE);

//CLIENTS

routes.post('/client', addClient);
routes.get('/clients', getClients);
routes.put('/client/:id', idExists('clients'), attClient);
routes.delete('/client/:id', idExists('clients'), deleteClient);

module.exports = routes;

const express = require('express');
const routes = require('./src/routes/routes');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);

const porta = process.env.PORT || 8000;
app.listen(porta);
console.log('rodando na porta', porta)


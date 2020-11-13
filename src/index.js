const express = require('express');
const cors = require('cors');
const login = require('./routes/login');
const register = require('./routes/register');
const dashboard = require('./routes/dashboard');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/resgister', register);
app.use('/dashboard', dashboard);

app.listen(3333);
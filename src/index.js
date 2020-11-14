const express = require('express');
const cors = require('cors');
const login = require('./routes/login');
const register = require('./routes/register');
const dashboard = require('./routes/dashboard');
const verification = require('./routes/verification');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/register', register);
app.use('/verification', verification);
app.use('/dashboard', dashboard);

app.listen(3333);
const express = require('express');
const cors = require('cors');
const login = require('./routes/login');
const sendKeyRegister = require('./routes/sendKeyRegister');
const sendKeyPass = require('./routes/sendKeyPass');
const dashboard = require('./routes/dashboard');
const verification = require('./routes/verification');
const register = require('./routes/register');
const updatePass = require('./routes/updatePass');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/send/key', sendKeyRegister);
app.use('/send/key/pass', sendKeyPass);
app.use('/register', register);
app.use('/update/pass', updatePass);
app.use('/verification', verification);
app.use('/dashboard', dashboard);

app.listen(3333);
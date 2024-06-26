const express = require('express');
const mongoose = require('mongoose');
const properties = require('./config/properties');
const db = require('./config/db');
const router = require('./app/routes');

db();

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/db-status', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.send(`Database status: ${dbStatus}`);
});

app.use('/api', router);
app.listen(properties.PORT, properties.IP, () => {
    console.log(`Server is running on port ${properties.PORT}`);
});
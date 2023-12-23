const mysql = require('mysql2');
require('dotenv').config();

const connect_data = ({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

const connect = mysql.createPool(connect_data);

module.exports = connect;


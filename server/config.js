const {Pool} = require('pg');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'task_react_postgres1',
    password:'12345',
    port:5432
});

module.exports = pool;
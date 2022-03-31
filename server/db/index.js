const postgres = require('postgres');
require('dotenv').config();

// const sqlUrl = process.env.NODE_ENV === 'production'
//  ? process.env.SQL_URL_PROD
//  : process.env.SQL_URL_DEV;

const sqlUrl = process.env.SQL_URL_DEV;

const sql = postgres(sqlUrl, {
  max: 2,
});

module.exports = sql;

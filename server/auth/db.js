const sql = require('../db');

const getUserByEmailDB = async (email) => {
  const data = await sql`
    SELECT * FROM users WHERE email =${email};
  `;
  return data;
};

module.exports = { getUserByEmailDB };

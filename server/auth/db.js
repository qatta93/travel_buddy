// connect with sql db
const sql = require('../db');

// findUserByEmail check if the user exists

const getUserByEmailDB = async (email) => {
  const data = await sql`
    SELECT * FROM users WHERE email =${email};
  `;
  return data;
};

module.exports = { getUserByEmailDB };

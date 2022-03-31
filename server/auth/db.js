// connect with sql db
const sql = require('../db');

// findUserByEmail check if the user exists

const getUserByEmail = async (email) => {
  const data = await sql`
    SELECT * FROM users WHERE email =${email};
  `;
  return data;
};
module.exports = { getUserByEmail };

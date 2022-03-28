const sql = require('../db');

const getAllUsers = async () => {
  const users = await sql`
    SELECT u.id, u.username, u.email, u.name, c.country, l.language FROM users AS u
    JOIN countries AS c ON c.id=u.country_id
    JOIN users_languages AS ul ON ul.user_id=u.id
    JOIN languages AS l ON l.id=ul.language_id;
  `;
  return users;
};

const getUserById = async (id) => {
  const users = await sql`
    SELECT u.id, u.username, u.email, u.name, c.country, l.language FROM users AS u
    JOIN countries AS c ON c.id=u.country_id
    JOIN users_languages AS ul ON ul.user_id=u.id
    JOIN languages AS l ON l.id=ul.language_id
    WHERE u.id=${id};
  `;
  return users;
};

module.exports = {
  getAllUsers,
  getUserById,
};

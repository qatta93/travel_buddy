const sql = require('../db');

const getAllUsers = async () => {
  const users = await sql`
    SELECT u.id, u.username, u.email, u.name, u.age, u.summary, u.gender, c.country, l.language FROM users AS u
    JOIN countries AS c ON c.id=u.country_id
    JOIN users_languages AS ul ON ul.user_id=u.id
    JOIN languages AS l ON l.id=ul.language_id;
  `;
  return users;
};

const getUserById = async (id) => {
  const users = await sql`
    SELECT u.id, u.username, u.email, u.name, u.age, u.summary, u.gender, c.country, l.language FROM users AS u
    JOIN countries AS c ON c.id=u.country_id
    LEFT JOIN users_languages AS ul ON ul.user_id=u.id
    LEFT JOIN languages AS l ON l.id=ul.language_id
    WHERE u.id=${id};
  `;
  return users;
};

const getCountryIdByName = async (name) => {
  const countryId = await sql`
    SELECT id FROM countries WHERE country = ${name};
  `;
  return countryId[0].id;
};

const createUser = async (email, username, name, gender, age, countryId, summary = '') => {
  const data = await sql`
    INSERT INTO users (email, username, name, gender, age, summary, country_id)
    VALUES (${email}, ${username}, ${name}, ${gender}, ${age}, ${summary}, ${countryId})
    RETURNING id, username;
  `;
  return data[0];
};

const addLanguageToUser = async (userId, language) => {
  const data = await sql`
    INSERT INTO users_languages (user_id, language_id)
    VALUES (${userId}, (SELECT id FROM languages WHERE language = ${language}));
  `;

  return data;
};

const getLanguagesByUserId = async (id) => {
  const data = await sql`
    SELECT l.language FROM users_languages AS ul
    JOIN languages AS l ON ul.language_id=l.id
    WHERE user_id = ${id};
  `;
  return data.map((obj) => obj.language);
};

const deleteUserById = async (id) => {
  await sql`
    DELETE FROM users WHERE id = ${id};
  `;
};

const deleteAllTestUsers = async () => {
  await sql`
    DELETE FROM users WHERE username ILIKE '%test%';
  `;
};

module.exports = {
  getAllUsers,
  getUserById,
  getCountryIdByName,
  createUser,
  getLanguagesByUserId,
  deleteUserById,
  addLanguageToUser,
  deleteAllTestUsers,
};

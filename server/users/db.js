const sql = require('../db');

const getAllUsersDB = async () => {
  const users = await sql`
    SELECT
    u.id, u.username, u.email, u.name, u.age, u.summary, u.gender, u.avatar, c.country,
    l.id AS "languageId", l.language_code AS "language", l.language_code AS "languageCode"
    FROM users AS u
    JOIN countries AS c ON c.id=u.country_id
    JOIN users_languages AS ul ON ul.user_id=u.id
    JOIN languages AS l ON l.id=ul.language_id;
  `;
  return users;
};

const getUserByIdDB = async (id) => {
  const users = await sql`
    SELECT
    u.id, u.username, u.email, u.name, u.age, u.summary, u.gender, u.avatar, c.country,
    l.id AS "languageId", l.language AS "language", l.language_code AS "languageCode"
    FROM users AS u
    JOIN countries AS c ON c.id=u.country_id
    LEFT JOIN users_languages AS ul ON ul.user_id=u.id
    LEFT JOIN languages AS l ON l.id=ul.language_id
    WHERE u.id=${id};
  `;
  return users;
};

const getCountryByNameDB = async (name) => {
  const data = await sql`
    SELECT * FROM countries WHERE country = ${name};
  `;
  return data;
};

const createUserDB = async (user) => {
  const data = await sql`
    INSERT INTO users ${sql(user)} RETURNING *;
  `;
  return data;
};

const addLanguageToUserDB = async (userId, language) => {
  const data = await sql`
    INSERT INTO users_languages (user_id, language_id)
    VALUES (${userId}, (SELECT id FROM languages WHERE language = ${language}));
  `;

  return data;
};

const getLanguagesByUserIdDB = async (id) => {
  const data = await sql`
    SELECT l.language_code AS "language" FROM users_languages AS ul
    JOIN languages AS l ON ul.language_id=l.id
    WHERE user_id = ${id};
  `;
  return data;
};

const deleteUserByIdDB = async (id) => {
  await sql`
    DELETE FROM users WHERE id = ${id};
  `;
};

const deleteAllTestUsersDB = async () => {
  await sql`
    DELETE FROM users WHERE username ILIKE '%test%';
  `;
};

module.exports = {
  getAllUsersDB,
  getUserByIdDB,
  getCountryByNameDB,
  createUserDB,
  getLanguagesByUserIdDB,
  deleteUserByIdDB,
  addLanguageToUserDB,
  deleteAllTestUsersDB,
};

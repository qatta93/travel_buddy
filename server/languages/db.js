const sql = require('../db');

const getAllLanguagesDB = async () => {
  const data = await sql`
    SELECT id, language, language_code AS "languageCode" FROM languages
  `;
  return data;
};

const getLanguageByIdDB = async (id) => {
  const data = await sql`
    SELECT id, language, UPPER(language_code) AS "languageCode" FROM languages WHERE id = ${id}
  `;
  return data;
};

module.exports = {
  getAllLanguagesDB,
  getLanguageByIdDB,
};

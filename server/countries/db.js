const sql = require('../db');

const getAllCountriesDB = async () => {
  const data = await sql`
    SELECT * FROM countries;
  `;
  return data;
};

const getCountryByIdDB = async (id) => {
  const data = await sql`
    SELECT * FROM countries WHERE id = ${id}
  `;
  return data;
};

module.exports = {
  getAllCountriesDB,
  getCountryByIdDB,
};

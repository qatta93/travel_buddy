const { getAllCountriesDB, getCountryByIdDB } = require('./db');

const getAllCountries = async () => {
  const data = await getAllCountriesDB();
  return data;
};

const getCountryById = async (id) => {
  const data = await getCountryByIdDB(id);
  return data.length > 0 ? data[0] : null;
};

module.exports = {
  getAllCountries,
  getCountryById,
};

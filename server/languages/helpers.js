const { getAllLanguagesDB, getLanguageByIdDB } = require('./db');

const getAllLanguages = async () => {
  const data = await getAllLanguagesDB();
  return data;
};

const getLanguageById = async (id) => {
  const data = await getLanguageByIdDB(id);
  return data.length > 0 ? data[0] : null;
};

module.exports = {
  getAllLanguages,
  getLanguageById,
};

const { getUserByEmailDB } = require('./db');

const getUserByEmail = async (email) => {
  const data = await getUserByEmailDB(email);
  return data.length > 0 ? data[0] : null;
};

module.exports = { getUserByEmail };

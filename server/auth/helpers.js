const { getUserByEmailDB } = require('./db');
const { createUser } = require('../users/helpers');

const getUserByEmail = async (email) => {
  const data = await getUserByEmailDB(email);
  return data.length > 0 ? data[0] : null;
};

const createNewUser = async (profile) => {
  const newProfile = {
    name: profile.name.givenName,
    email: profile.emails[0].value,
    languages: ['English'],
  };
  const data = await createUser(newProfile);
  return data;
};

module.exports = { getUserByEmail, createNewUser };

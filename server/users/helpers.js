const {
  getAllUsersDB,
  getUserByIdDB,
  getCountryByNameDB,
  createUserDB,
  getLanguagesByUserIdDB,
  deleteUserByIdDB,
  addLanguageToUserDB,
  deleteAllTestUsersDB,
} = require('./db');

const findIndexById = (array, id) => array.findIndex((ele) => ele.id === id);

const addLanguages = (array, user) => {
  const languages = array
    .filter((u) => u.id === user.id)
    .map((u) => u.language);
  return {
    ...user,
    languages,
  };
};

const parseUsers = (users) => {
  const newUsers = users
    .filter((user, index) => findIndexById(users, user.id) === index)
    .map((user) => addLanguages(users, user));
  return newUsers;
};

const getAllUsers = async () => {
  const users = await getAllUsersDB();
  return parseUsers(users);
};

const getUserById = async (id) => {
  const user = await getUserByIdDB(id);
  const parsedUser = parseUsers(user);
  return parsedUser.length > 0 ? parsedUser[0] : null;
};

const createUser = async (email, username, name, gender, age, country, summary = '', languages = []) => {
  const [{ id: countryId }] = await getCountryByNameDB(country);
  const [newUser] = await createUserDB(email, username, name, gender, age, countryId, summary);
  const newLanguagesPromises = languages.map((lang) => addLanguageToUserDB(newUser.id, lang));
  await Promise.all(newLanguagesPromises);
  return { id: newUser.id, username: newUser.username };
};

const getLanguagesByUserId = async (id) => {
  const data = await getLanguagesByUserIdDB(id);
  return data.map((obj) => obj.language);
};

const deleteUserById = async (id) => deleteUserByIdDB(id);

const deleteAllTestUsers = async () => deleteAllTestUsersDB();

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getLanguagesByUserId,
  deleteUserById,
  deleteAllTestUsers,
};

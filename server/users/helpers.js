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
    .map((u) => ({
      id: Number(u.languageId),
      language: u.language,
      languageCode: u.languageCode.toUpperCase(),
    }));
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

const createUser = async (newUser) => {
  const [{ id: countryId }] = await getCountryByNameDB(newUser.country);
  const newUserData = {
    email: newUser.email,
    username: newUser.username,
    name: newUser.name,
    gender: newUser.gender,
    age: newUser.age,
    country_id: countryId,
    summary: newUser.summary || '',
    avatar: newUser.avatar || '',
  };
  const [userDB] = await createUserDB(newUserData);
  const newLanguagesPromises = newUser.languages
    .map(async (lang) => addLanguageToUserDB(userDB.id, lang));
  await Promise.all(newLanguagesPromises);
  return { id: userDB.id, username: userDB.username };
};

const getLanguagesByUserId = async (id) => {
  const data = await getLanguagesByUserIdDB(id);
  return data.map((language) => ({
    ...language,
    languageCode: language.languageCode.toUpperCase(),
  }));
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

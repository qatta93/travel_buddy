const findIndexById = (array, id) => array.findIndex((ele) => ele.id === id);

const addLanguages = (array, user) => {
  const languages = array.filter((u) => u.id === user.id).map((u) => u.language);
  return {
    ...user,
    languages,
  };
};

const parseUsers = (users) => {
  const newUsers = users
    .filter((user, index, arr) => findIndexById(arr, user.id) === index)
    .map((user) => addLanguages(users, user));
  return newUsers;
};

module.exports = {
  parseUsers,
};

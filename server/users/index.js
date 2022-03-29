const express = require('express');
const {
  getAllUsers, getUserById, getCountryIdByName, createUser, deleteUserById, addLanguageToUser,
} = require('./db');
const { parseUsers } = require('./helpers');

const router = express.Router();

const validateId = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(404).json({ status: 'error', message: 'user not found' });
    }
    const users = await getUserById(req.params.id);
    const parsedUsers = parseUsers(users);
    if (parsedUsers.length === 0) {
      return res.status(404).json({ status: 'error', message: 'user not found' });
    }
    const user = parsedUsers[0];
    req.locals = user;
    return next();
  } catch (err) {
    return next(err);
  }
};

router.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    const parsedUsers = parseUsers(users);
    return res.json({ status: 'success', data: parsedUsers });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', validateId, async (req, res) => res.json({ status: 'success', data: req.locals }));

router.post('/', async (req, res, next) => {
  try {
    const countryId = await getCountryIdByName(req.body.country);
    const {
      email, username, name, gender, age, summary, languages,
    } = req.body;
    const newUser = await createUser(email, username, name, gender, age, countryId, summary);

    const newLanguagesPromises = languages.map((lang) => addLanguageToUser(newUser.id, lang));

    await Promise.all(newLanguagesPromises);

    return res
      .status(201)
      .location(`/api/users/${newUser.id}`)
      .json({ status: 'success', data: newUser });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await deleteUserById(id);
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

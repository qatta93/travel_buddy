const express = require('express');
const { getAllUsers, getUserById } = require('./db');
const { parseUsers } = require('./helpers');

const router = express.Router();

const validateId = async (req, res, next) => {
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
};

router.get('/', async (req, res) => {
  const users = await getAllUsers();
  const parsedUsers = parseUsers(users);
  return res.json({ status: 'success', data: parsedUsers });
});

router.get('/:id', validateId, async (req, res) => res.json({ status: 'success', data: req.locals }));

module.exports = router;

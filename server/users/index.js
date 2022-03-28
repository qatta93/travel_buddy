const express = require('express');
const { getAllUsers } = require('./db');
const { parseUsers } = require('./helpers');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await getAllUsers();
  const parsedUsers = parseUsers(users);
  res.json({ status: 'success', data: parsedUsers });
});

module.exports = router;

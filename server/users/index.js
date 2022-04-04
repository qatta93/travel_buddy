const express = require('express');
const {
  getAllUsers, getUserById, createUser, deleteUserById, updateUser,
} = require('./helpers');

const router = express.Router();

const validateId = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(404).json({ status: 'error', message: 'user not found' });
    }
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'user not found' });
    }
    req.locals = user;
    return next();
  } catch (err) {
    return next(err);
  }
};

router.use((req, res, next) => {
  res.set('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllUsers();
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', validateId, async (req, res) => res.json({ status: 'success', data: req.locals }));

router.post('/', async (req, res, next) => {
  try {
    const newUser = req.body;
    const data = await createUser(newUser);
    return res
      .status(201)
      .location(`/api/users/${data.id}`)
      .json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteUserById(req.params.id);
    return res.json({ status: 'success' });
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = req.body;
    const data = await updateUser(req.params.id, updatedUser);
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

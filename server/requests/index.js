const express = require('express');
const { getAllRequests, getRequestById } = require('./helpers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllRequests();
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await getRequestById(req.params.id);
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

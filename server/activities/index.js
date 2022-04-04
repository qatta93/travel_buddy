const express = require('express');
const { getAllActivities, getActivityById } = require('./helpers');

const router = express.Router();

router.use((req, res, next) => {
  res.set('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllActivities();
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await getActivityById(req.params.id);
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

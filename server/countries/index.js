const express = require('express');
const { getAllCountries, getCountryById } = require('./helpers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllCountries();
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await getCountryById(req.params.id);
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

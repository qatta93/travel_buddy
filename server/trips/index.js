const express = require('express');
const { getAllTrips, getTripById } = require('./helpers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const trips = await getAllTrips();
    return res.json({ status: 'success', data: trips });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const trip = await getTripById(req.params.id);
    return res.json({ status: 'success', data: trip });
  } catch (err) {
    return next(err);
  }
});

// router.get('/', async (req, res, next) => {
//   try {
//     return res.json({ status: 'success', data: trip });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;

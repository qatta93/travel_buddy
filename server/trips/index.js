const express = require('express');
const {
  getAllTrips, getTripById, createTrip, deleteTripById,
} = require('./helpers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllTrips();
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await getTripById(req.params.id);
    return res.json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newTrip = req.body;
    const data = await createTrip(newTrip);
    return res
      .status(201)
      .location(`/api/trips/${data.id}`)
      .json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteTripById(req.params.id);
    return res.json({ status: 'success' });
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

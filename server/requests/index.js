const express = require('express');
const { getAllRequests, getRequestById, createRequest } = require('./helpers');

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

router.post('/', async (req, res, next) => {
  try {
    const newTrip = {
      trip_id: req.body.trip_id,
      user_id: req.body.user_id,
      message: req.body.message,
    };
    const data = await createRequest(newTrip);
    return res
      .status(201)
      .location(`/api/requests/${data.id}`)
      .json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

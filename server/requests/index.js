const express = require('express');
const {
  getAllRequests, getRequestById, createRequest, deleteRequestById, updateRequestById,
} = require('./helpers');

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
    const newRequest = {
      trip_id: req.body.trip_id,
      user_id: req.body.user_id,
      message: req.body.message,
    };
    const data = await createRequest(newRequest);
    return res
      .status(201)
      .location(`/api/requests/${data.id}`)
      .json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  console.log(req.body);
  try {
    const updatedRequest = {
      trip_id: req.body.trip_id,
      user_id: req.body.user_id,
      message: req.body.message,
      status: req.body.status,
    };
    const data = await updateRequestById(req.params.id, updatedRequest);
    return res.status(200).json({ status: 'success', data });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteRequestById(req.params.id);
    return res.json({ status: 'success' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

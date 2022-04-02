const {
  getAllRequestsDB, getRequestByIdDB, createRequestDB, deleteRequestByIdDB,
} = require('./db');

const getAllRequests = async () => {
  const data = await getAllRequestsDB();
  return data;
};

const getRequestById = async (id) => {
  const data = await getRequestByIdDB(id);
  return data.length > 0 ? data[0] : null;
};

const createRequest = async (newTrip) => {
  const data = await createRequestDB(newTrip);
  return { id: data[0].id };
};

const deleteRequestById = async (id) => deleteRequestByIdDB(id);

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  deleteRequestById,
};

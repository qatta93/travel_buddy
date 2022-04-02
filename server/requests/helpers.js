const {
  getAllRequestsDB, getRequestByIdDB, createRequestDB, deleteRequestByIdDB, updateRequestByIdDB,
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

const updateRequestById = async (id, updatedTrip) => {
  const data = await updateRequestByIdDB(id, updatedTrip);
  return data[0];
};

const deleteRequestById = async (id) => deleteRequestByIdDB(id);

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  deleteRequestById,
  updateRequestById,
};

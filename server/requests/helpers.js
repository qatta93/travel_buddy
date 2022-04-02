const {
  getAllRequestsDB, getRequestByIdDB, createRequestDB, deleteRequestByIdDB, updateRequestByIdDB,
} = require('./db');

const parseUser = (request) => ({
  ...request,
  user: {
    id: request.userId,
    name: request.name,
    username: request.username,
    email: request.email,
  },
});

const getAllRequests = async () => {
  const data = await getAllRequestsDB();
  return data.map((request) => parseUser(request));
};

const getRequestById = async (id) => {
  const data = await getRequestByIdDB(id);
  const parsedData = data.map((request) => parseUser(request));
  return parsedData.length > 0 ? parsedData[0] : null;
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

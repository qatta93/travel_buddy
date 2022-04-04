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

const createRequest = async (newRequest) => {
  const newRequestData = {
    trip_id: newRequest.tripId,
    user_id: newRequest.userId,
    message: newRequest.message || '',
  };
  const data = await createRequestDB(newRequestData);
  return { id: data[0].id };
};

const updateRequestById = async (id, updatedRequest) => {
  const updatedRequestData = {
    trip_id: updatedRequest.tripId,
    user_id: updatedRequest.userId,
    message: updatedRequest.message || '',
    status: updatedRequest.status,
    sent_on: updatedRequest.sentOn,
  };
  const data = await updateRequestByIdDB(id, updatedRequestData);
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

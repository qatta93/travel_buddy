const { getAllRequestsDB, getRequestByIdDB } = require('./db');

const getAllRequests = async () => {
  const data = await getAllRequestsDB();
  return data;
};

const getRequestById = async (id) => {
  const data = await getRequestByIdDB(id);
  return data.length > 0 ? data[0] : null;
};

module.exports = {
  getAllRequests,
  getRequestById,
};

const { getAllActivitiesDB, getActivityByIdDB } = require('./db');

const getAllActivities = async () => {
  const data = await getAllActivitiesDB();
  return data;
};

const getActivityById = async (id) => {
  const data = await getActivityByIdDB(id);
  return data.length > 0 ? data[0] : null;
};

module.exports = {
  getAllActivities,
  getActivityById,
};

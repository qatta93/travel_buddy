const sql = require('../db');

const getAllActivitiesDB = async () => {
  const data = await sql`
    SELECT * FROM activities;
  `;
  return data;
};

const getActivityByIdDB = async (id) => {
  const data = await sql`
    SELECT * FROM activities WHERE id = ${id}
  `;
  return data;
};

module.exports = {
  getAllActivitiesDB,
  getActivityByIdDB,
};

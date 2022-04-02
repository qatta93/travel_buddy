const sql = require('../db');

const getAllRequestsDB = async () => {
  const data = await sql`
    SELECT * FROM requests;
  `;
  return data;
};

const getRequestByIdDB = async (id) => {
  const data = await sql`
    SELECT * FROM requests WHERE id = ${id}
  `;
  return data;
};

module.exports = {
  getAllRequestsDB,
  getRequestByIdDB,
};

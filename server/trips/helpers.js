const {
  getAllTripsDB,
  getTripByIdDB,
} = require('./db');

const findIndexById = (array, id) => array.findIndex((ele) => ele.id === id);

const removeDuplicated = (array) => array
  .filter((val, index) => array.indexOf(val) === index);

const addData = (field, newField) => (array, trip) => {
  const allFieldValues = array
    .filter((t) => t.id === trip.id)
    .map((t) => t[field]);

  const fieldValues = removeDuplicated(allFieldValues);

  return {
    ...trip,
    [newField]: fieldValues,
  };
};

const addCountries = addData('country', 'countries');
const addPlaces = addData('place', 'places');
const addActivities = addData('activity', 'activities');
const addPassengers = addData('passenger', 'passengers');

const parseTrips = (trips) => trips
  .filter((trip, index) => findIndexById(trips, trip.id) === index)
  .map((trip) => addCountries(trips, trip))
  .map((trip) => addActivities(trips, trip))
  .map((trip) => addPlaces(trips, trip))
  .map((trip) => addPassengers(trips, trip));

const getAllTrips = async () => {
  const trips = await getAllTripsDB();
  return parseTrips(trips);
};

const getTripById = async (id) => {
  const trip = await getTripByIdDB(id);
  const parsedTrip = parseTrips(trip);
  return parsedTrip.length > 0 ? parsedTrip[0] : null;
};

module.exports = {
  getAllTrips,
  getTripById,
};

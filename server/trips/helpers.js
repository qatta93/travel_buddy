/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

const {
  getAllTripsDB,
  getTripByIdDB,
  createTripDB,
  deleteTripByIdDB,
  addCountryToTripDB,
  addActivityToTripDB,
  createPlaceDB,
  getPlaceByNameDB,
  addPlaceToTripDB,
} = require('./db');

const findIndexById = (array, id) => array.findIndex((ele) => ele.id === id);

const removeDuplicated = (array) => array
  .filter((val, index) => array.indexOf(val) === index && val !== null);

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

const getPlaceIdOrCreate = async (place) => {
  const data = await getPlaceByNameDB(place);
  if (data) {
    return data.id;
  }
  const newPlace = await createPlaceDB(place);
  return newPlace[0].id;
};

const createTrip = async (newTrip) => {
  const {
    authorId, summary, description, budget, activities, countries, places, images, maxPassengers,
  } = newTrip;

  const [trip] = await createTripDB(authorId, description, maxPassengers, summary, budget, images);

  if (countries) {
    for (const country of countries) {
      await addCountryToTripDB(trip.id, country);
    }
  }

  if (activities) {
    for (const activity of activities) {
      await addActivityToTripDB(trip.id, activity);
    }
  }

  if (places) {
    for (const place of places) {
      const placeId = await getPlaceIdOrCreate(place);
      await addPlaceToTripDB(trip.id, placeId);
    }
  }

  return { id: trip.id };
};

const deleteTripById = async (id) => deleteTripByIdDB(id);

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  deleteTripById,
};

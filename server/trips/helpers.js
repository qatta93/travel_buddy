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

const addAuthor = (trip) => ({
  ...trip,
  author: {
    id: trip.authorId,
    username: trip.authorUsername,
    age: trip.authorAge,
    gender: trip.authorGender,
  },
});

const parseTrips = (trips) => trips
  .filter((trip, index) => findIndexById(trips, trip.id) === index)
  .map((trip) => addCountries(trips, trip))
  .map((trip) => addActivities(trips, trip))
  .map((trip) => addPlaces(trips, trip))
  .map((trip) => addPassengers(trips, trip))
  .map(addAuthor);

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
  const newTripData = {
    author_id: newTrip.authorId,
    description: newTrip.description,
    from: newTrip.from,
    to: newTrip.to,
    max_passengers: newTrip.maxPassengers,
    summary: newTrip.summary || '',
    budget: newTrip.budget || 0,
    images: newTrip.images || '',
    gender_restrictions: newTrip.genderRestrictions || null,
  };

  const [trip] = await createTripDB(newTripData);

  if (newTrip.countries) {
    await Promise.all(newTrip.countries
      .map(async (country) => addCountryToTripDB(trip.id, country)));
  }

  if (newTrip.activities) {
    await Promise.all(newTrip.activities
      .map(async (activity) => addActivityToTripDB(trip.id, activity)));
  }

  if (newTrip.places) {
    await Promise.all(newTrip.places.map(async (place) => {
      const placeId = await getPlaceIdOrCreate(place);
      await addPlaceToTripDB(trip.id, placeId);
    }));
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

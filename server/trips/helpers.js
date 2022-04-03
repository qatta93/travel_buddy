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
  .filter((ele, index) => {
    if (ele === null) {
      return false;
    }
    if (typeof ele === 'object') {
      return array.findIndex((obj) => obj.id === ele.id) === index;
    }
    return array.indexOf(ele) === index;
  });

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

const addPlaces = addData('place', 'places');
const addActivities = addData('activity', 'activities');
const addPassengers = addData('passenger', 'passengers');

const addCountries = (array, trip) => {
  const allFieldValues = array
    .filter((t) => t.id === trip.id)
    .map((t) => ({
      id: t.countryId,
      code: t.code,
      country: t.country,
      countryCode: t.countryCode,
    }));

  const fieldValues = removeDuplicated(allFieldValues);

  return {
    ...trip,
    countries: fieldValues,
  };
};

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
    author_id: newTrip.authorId || 1,
    description: newTrip.description || '',
    from: newTrip.from || new Date(),
    to: newTrip.to || new Date(),
    max_passengers: newTrip.maxPassengers || 10,
    summary: newTrip.summary || '',
    budget: newTrip.budget || 0,
    images: newTrip.images || '/images/trip-default.jpg',
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

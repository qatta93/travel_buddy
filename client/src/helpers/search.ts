import { ITrip, SearchFilters } from '../types';

interface Gender {
  male: boolean,
  female: boolean,
  other: boolean,
}

const filterTripByBudget = (trip: ITrip, budget: number | undefined): boolean => (
  budget ? trip.budget <= budget : true
);

const filterTripByAgeFrom = (trip: ITrip, ageFrom: number | undefined): boolean => (
  ageFrom ? trip.authorAge >= ageFrom : true
);

const filterTripByAgeTo = (trip: ITrip, ageTo: number | undefined): boolean => (
  ageTo ? trip.authorAge <= ageTo : true
);

const filterTripByGender = (trip: ITrip, gender: Gender): boolean => {
  if (!gender.male && !gender.female && !gender.other) {
    return true;
  }
  if (gender.male && trip.genderRestrictions === 'male') {
    return true;
  }
  if (gender.female && trip.genderRestrictions === 'female') {
    return true;
  }
  if (gender.other && trip.genderRestrictions === 'other') {
    return true;
  }
  return false;
};

const filterTripByDateFrom = (trip: ITrip, dateFrom: string | undefined): boolean => {
  if (!dateFrom) {
    return true;
  }
  return new Date(dateFrom) <= new Date(trip.from);
};

const filterTripByDateTo = (trip: ITrip, dateTo: string | undefined): boolean => {
  if (!dateTo) {
    return true;
  }
  return new Date(dateTo) >= new Date(trip.to);
};

const filterTripByCountries = (trip: ITrip, countries: string[]): boolean => {
  if (countries.length === 0) {
    return true;
  }
  if (countries.includes('All')) {
    return true;
  }
  if (countries.some((country) => trip.countries.includes(country))) {
    return true;
  }
  return false;
};

export const filterTripSearch = (trips: ITrip[], filters: SearchFilters): ITrip[] => trips
  .filter((trip) => filterTripByBudget(trip, filters.budget))
  .filter((trip) => filterTripByAgeFrom(trip, filters.ageFrom))
  .filter((trip) => filterTripByAgeTo(trip, filters.ageTo))
  .filter((trip) => filterTripByGender(trip, filters.gender))
  .filter((trip) => filterTripByDateFrom(trip, filters.dateFrom))
  .filter((trip) => filterTripByDateTo(trip, filters.dateTo))
  .filter((trip) => filterTripByCountries(trip, filters.countries));

export interface ITrip {
  id: number,
  authorId: number,
  authorUsername: string,
  authorAge: number,
  authorGender: string,
  budget: number,
  summary: string,
  description: string,
  from: string,
  to: string,
  images: string,
  maxPassengers: number,
  countries: string[],
  ativities: string[],
  places: string[],
  passengers: number[],
  genderRestrictions: string | null,
}

export interface IUser {
  id: number,
  username: string,
  email: string,
  name: string,
  age: number,
  summary: string,
  gender: string,
  country: string,
  languages: string[],
  avatar: string | null,
}

export interface SearchFilters {
  countries: string[],
  ageFrom: number | undefined,
  ageTo: number | undefined,
  dateFrom: string | undefined,
  dateTo: string | undefined,
  budget: number | undefined,
  gender: {
    male: boolean,
    female: boolean,
    other: boolean,
  },
}

export interface ICountry {
  id: number,
  code: string,
  country: string,
  country_code: string,
}

export interface IActivity {
  id: number,
  activity: string,
}

export interface IRequest {
  id: number,
  trip_id: number,
  user_id: number,
  status: string,
  message: string,
}

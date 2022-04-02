export interface ILanguage {
  id: number,
  language: string,
  languageCode: string,
}

export interface ITripAuthor {
  id: number,
  username: string,
  age: number,
  gender: string,
}

export interface ICountry {
  id: number,
  country: string,
  code: string,
  countryCode: string,
}

export interface ITrip {
  id: number,
  author: ITripAuthor
  budget: number,
  summary: string,
  description: string,
  from: string,
  to: string,
  images: string,
  maxPassengers: number,
  countries: ICountry[],
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
  languages: ILanguage[],
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

export interface IActivity {
  id: number,
  activity: string,
}

export interface IRequestUser {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface IRequest {
  id: number,
  user: IRequestUser,
  tripId: string,
  message: string,
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled',
  sent_on: string,
}

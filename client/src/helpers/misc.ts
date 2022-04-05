export const capitalizeFirstLetter = (str: string) => str[0].toUpperCase + str.slice(1);

export const parseGenderRestrictions = (genderRestrictions: string | null): string => {
  if (!genderRestrictions) {
    return 'M/F/Other';
  }
  if (genderRestrictions === 'female') {
    return 'F';
  }
  return 'M';
};

const prependZero = (num: number): string => (num < 10 ? `0${num}` : num.toString());

export const formatDatesTrip = (from: string, to: string): string => {
  const f = new Date(from);
  const t = new Date(to);

  return `${prependZero(f.getDate())}-${prependZero(f.getMonth())} - ${prependZero(t.getDate())}-${prependZero(t.getMonth())}-${t.getFullYear()}`;
};

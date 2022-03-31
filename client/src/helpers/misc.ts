export const capitalizeFirstLetter = (str: string) => str[0].toUpperCase + str.slice(1);

export const parseGenderRestrictions = (genderRestrictions: string | null): string => {
  if (!genderRestrictions) {
    return 'M/F';
  }
  if (genderRestrictions === 'female') {
    return 'F';
  }
  return 'M';
};

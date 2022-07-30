import { CountryResponse } from '../interfaces';

export const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/region/ame');
    const countries: CountryResponse[] = await response.json();
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
    return [];
  }
};

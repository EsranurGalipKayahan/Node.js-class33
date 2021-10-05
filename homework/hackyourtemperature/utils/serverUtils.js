import { APPLICATION_NAME } from "../sources/constants.js";

export const getCelcius = (kelvin) => {
  return (kelvin - 273).toFixed(2);
};
export const getObj = (cityName, temperature) => {
  if (temperature) {
    return {
      weatherText: `The temperature in ${cityName} is ${getCelcius(
        temperature
      )} °C!`,
      title: APPLICATION_NAME,
    };
  } else {
    return {
      weatherText: `${cityName}`,
      title: APPLICATION_NAME,
    };
  }
};
export const getErrorObj = (statusCode) => {
  return {
    status: `${statusCode}`,
    message: "Something went wrong!",
    title: APPLICATION_NAME,
  };
};

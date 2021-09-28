export const getCelcius = (kelvin) => {
  return (kelvin - 273).toFixed(2);
};
export const getObj = (weatherText, temperature) => {
  if (temperature) {
    return {
      weatherText: `${weatherText}`,
      temperature: `${getCelcius(temperature)}`,
    };
  } else {
    return {
      weatherText: `${weatherText}`,
    };
  }
};
export const getErrorObj = (msg, statusCode) => {
  return { status: `${statusCode}`, message: msg };
};

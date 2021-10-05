import {
  BASE_URL,
  WEATHER_PARAM,
  API_KEY_PARAM,
} from "../sources/constants.js";
import keys from "../sources/keys.js";
import fetch from "node-fetch";
export const getWeather = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}${WEATHER_PARAM}${cityName}${API_KEY_PARAM}${keys.API_KEY}`
    );

    const js = await response.json();
    console.log(js);
    return js;
  } catch (err) {
    throw err;
  }
};

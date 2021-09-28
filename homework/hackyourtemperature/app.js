import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";

import { getCelcius, getErrorObj, getObj } from "./utils/serverUtils.js";
import {
  API_KEY_PARAM,
  BAD_REQUEST_CODE,
  BASE_URL,
  CITY_NAME_ERROR,
  NOT_FOUND_CODE,
  WEATHER_PARAM,
  SERVER_ERROR_CODE,
  SUCCESS_CODE,
} from "./sources/contants.js";

const app = express();

app.use(express.json());

const processValidResponse = (res, city, statusCode, degree) => {
  const obj = getObj(city, degree);
  res.status(statusCode).send(obj);
};
const processErrorResponse = (res, msg, statusCode) => {
  const obj = getErrorObj(msg, statusCode);
  res.status(statusCode).send(obj);
};
const getWeather = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}${WEATHER_PARAM}${cityName}${API_KEY_PARAM}${keys.API_KEY}`
    );

    const js = await response.json();
    return js;
  } catch (err) {
    throw err;
  }
};
app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;

  try {
    if (cityName) {
      const js = await getWeather(cityName);

      if (js.cod === `${NOT_FOUND_CODE}`) {
        processValidResponse(res, CITY_NAME_ERROR, NOT_FOUND_CODE);
      } else {
        processValidResponse(res, cityName, SUCCESS_CODE, js.main.temp);
      }
    } else {
      processErrorResponse(
        res,
        "Bad request, cityName missing!",
        BAD_REQUEST_CODE
      );
    }
  } catch (error) {
    processErrorResponse(res, "Something went wrong!", SERVER_ERROR_CODE);
  }
});
export default app;

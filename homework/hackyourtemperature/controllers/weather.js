import {
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  CITY_NAME_ERROR,
  SERVER_ERROR_CODE,
} from "../sources/constants.js";
import { getWeather } from "../utils/asyncUtils.js";
import { getObj, getErrorObj } from "../utils/serverUtils.js";
import { APPLICATION_NAME } from "../sources/constants.js";
export const handleMainPage = (req, res) => {
  res.render("index", { title: APPLICATION_NAME });
};

export const findWeather = async (req, res) => {
  const cityName = req.body.cityName;

  try {
    const js = await getWeather(cityName);
    if (js.cod === `${NOT_FOUND_CODE}` || js.cod === `${BAD_REQUEST_CODE}`) {
      res.render("index", getObj(CITY_NAME_ERROR));
    } else {
      res.render("index", getObj(cityName, js.main.temp));
    }
  } catch (error) {
    res.render("index", getErrorObj(SERVER_ERROR_CODE));
  }
};

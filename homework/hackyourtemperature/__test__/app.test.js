import { getCelcius, getObj } from "../utils/serverUtils.js";
import { getWeather } from "../utils/asyncUtils.js";
import { APPLICATION_NAME, CITY_NAME_ERROR } from "../sources/constants.js";

test("find celcius of 293 K", () => {
  const degree = 20.0;
  const strDegree = degree.toFixed(2).toString();
  expect(getCelcius(293)).toBe(strDegree);
});

test("get a valid obj", () => {
  const expectedObj = {
    weatherText: "City is not found!",
    title: APPLICATION_NAME,
  };
  expect(getObj(CITY_NAME_ERROR)).toEqual(expectedObj);
});
test("get a valid obj", () => {
  const expectedObj = {
    weatherText: "The temperature in izmir is 20.00 °C!",
    title: APPLICATION_NAME,
  };
  expect(getObj("izmir", 293)).toEqual(expectedObj);
});
test("get an error if cityName is missing", async () => {
  const expectedObj = {
    cod: "400",
    message: "Nothing to geocode",
  };
  const result = await getWeather("");
  expect(result).toEqual(expectedObj);
});
test("get a message if cityName is not found", async () => {
  const expectedObj = {
    cod: "404",
    message: "city not found",
  };
  const result = await getWeather("._+");
  expect(result).toEqual(expectedObj);
});

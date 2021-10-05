import app from "../app.js";
import supertest from "supertest";
import { APPLICATION_NAME } from "../sources/constants.js";
/* This file is belonged to the previous week */
const request = supertest(app);

describe("POST /api/weather", () => {
  describe("when the city is missing", () => {
    it("should respond with a status code of 400", async () => {
      const bodyData = {};
      const response = await request.post("/api/weather").send(bodyData);
      expect(response.statusCode).toBe(400);
    });
  });
  describe("when city is not valid", () => {
    it("should status code : 404, weatherText: city is not found", async () => {
      const bodyData = { cityName: "_1." };
      const response = await request.post("/api/weather").send(bodyData);
      expect(response.statusCode).toBe(404);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body).toEqual(
        expect.objectContaining({
          weatherText: "City is not found!",
          title: APPLICATION_NAME,
        })
      );
    });
  });
  describe("when the valid request comes", () => {
    it("should status code : 200, weatherText : includes given city", async () => {
      const bodyData = { cityName: "izmir" };
      const response = await request.post("/api/weather").send(bodyData);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      const responsedObj = response.body;

      expect(responsedObj.weatherText.includes(bodyData.cityName));
    });
  });
});

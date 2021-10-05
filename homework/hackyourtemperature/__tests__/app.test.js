import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("GET /", () => {
  describe("hello from server side to client side", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request.get("/").send();
      expect(response.statusCode).toBe(200);
    });
  });
});
describe("POST /weather", () => {
  describe("when the city is missing", () => {
    it("should respond with a status code of 400", async () => {
      const bodyData = {};
      const response = await request.post("/weather").send(bodyData);
      expect(response.statusCode).toBe(400);
    });
  });
  describe("when city is not valid", () => {
    test("should status code : 404, weatherText: city is not found", async () => {
      const bodyData = { cityName: "_1." };
      const response = await request.post("/weather").send(bodyData);
      expect(response.statusCode).toBe(404);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body).toEqual(
        expect.objectContaining({ weatherText: "City is not found!" })
      );
    });
  });
  describe("when the valid request comes", () => {
    test("should status code : 200, weatherText : city, temperature : number", async () => {
      const bodyData = { cityName: "izmir" };
      const response = await request.post("/weather").send(bodyData);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      const responsedObj = response.body;

      expect(responsedObj.weatherText).toEqual(bodyData.cityName);
      expect(Number(responsedObj.temperature)).not.toBeNaN;
    });
  });
});

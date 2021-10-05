import { getWeather } from "../utils/asyncUtils.js";
import { handleMainPage, findWeather } from "../controllers/weather.js";
import express from "express";

const router = express.Router();

router.get("/", handleMainPage);

router.post("/weather", findWeather);

export default router;

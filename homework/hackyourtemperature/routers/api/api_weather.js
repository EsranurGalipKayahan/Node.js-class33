import express from "express";
import { handleApiRequest } from "../../controllers/api_weather.js";
const router = express.Router();

router.post("/", handleApiRequest);

export default router;

import express from "express";
import { handleErrorPage } from "../controllers/wrongPath.js";

const router = express.Router();

router.use(handleErrorPage);

export default router;

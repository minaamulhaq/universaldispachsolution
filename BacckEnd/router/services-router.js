import { Router } from "express";
import { getServices } from "../controllers/services-controller.js";
const router = Router();
router.route("/services").get(getServices);
export { router };
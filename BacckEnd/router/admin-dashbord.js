import { Router } from "express";
import { adminUser, deleteUser, updateUser } from "../controllers/admin-user.js";
import { adminContact } from "../controllers/admin-contact.js";
import { adminServices } from "../controllers/admin-services.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { deleteService } from "../controllers/delete-service-controller.js";
import { updateServices } from "../controllers/services-update-controller.js";

const router = Router();
router.route("/user").get(authMiddleware, adminMiddleware, adminUser);
router.route("/services").get(authMiddleware, adminMiddleware, adminServices);
router.route("/contact").get(authMiddleware, adminMiddleware, adminContact);
router.route("/services/delete/:id").delete(authMiddleware, adminMiddleware, deleteService);
router.route("/services/update/:id").patch(authMiddleware, adminMiddleware, updateServices);
router.route("/user/delete/:id").delete(authMiddleware, adminMiddleware, deleteUser);
router.route("/user/update/:id").patch(authMiddleware, adminMiddleware, updateUser);

export { router }; 

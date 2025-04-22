import { Router } from "express";
import { home, register, login, user } from "../controllers/auth-controller.js";
import { validateMiddleware } from "../middleware/validate-middleware.js";
import { signUpSchema } from "../validator/auth-validator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
// import { User } from "../model/user-model.js";
const router = Router();

router.route("/").get(home);
const validate = validateMiddleware(signUpSchema);
router.route("/register").post(validate, register);
router.route("/login").post(login);
router.route("/user").get(authMiddleware, user);

export { router };
// export default router;
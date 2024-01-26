import express from "express";
import * as authController from "../controllers/authController.js";
import authGuard from "../middleware/authGuard.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/login", authController.userLogin);

router.post("/create", authController.createUser);

router
  .route("/admin")
  .get(authController.renderLogin)
  .post(authController.adminLogin);

export default router;

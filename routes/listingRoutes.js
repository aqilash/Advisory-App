import express from "express";
import * as listingController from "../controllers/listingController.js";
import authGuard from "../middleware/authGuard.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.use(authGuard);

router.get("/get", listingController.getListingByID);

router.use(isAdmin);

router
  .route("/")
  .get(listingController.getAllListing)
  .post(listingController.createListing);

router.get("/add", listingController.renderCreateForm);

router
  .route("/:id")
  .get(listingController.renderDetails)
  .put(listingController.editListing)
  .delete(listingController.deleteListing);

router.get("/:id/edit", listingController.renderEditForm);

export default router;

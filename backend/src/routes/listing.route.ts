import express, { Router } from "express";
import { createListing } from "../controllers/listing.controller";
import { authenticationByUser } from "../utils/verifyUser";

const router: Router = express.Router();

router.post('/create', authenticationByUser ,createListing);

export default router;
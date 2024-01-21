import express, { Router } from "express";
import { updateUserController } from "../controllers/user.controller";
import { authenticationByUser   } from "../utils/verifyUser";

const router: Router = express.Router();

router.put("/update/:id",authenticationByUser , updateUserController);

export default router;
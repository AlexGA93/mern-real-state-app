import express, { Router } from "express";
import { deleteUserController, updateUserController } from "../controllers/user.controller";
import { authenticationByUser   } from "../utils/verifyUser";

const router: Router = express.Router();

router.put("/update/:id",authenticationByUser , updateUserController);
router.delete("/delete/:id",authenticationByUser, deleteUserController);

export default router;
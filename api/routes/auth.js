import { Router } from "express";

import { login } from "../controllers/auth.js";
import { authValidator } from "../validators/auth.js";

export const router = Router();

router.post("/", authValidator, login);

import { Router } from "express";

import { googleSignIn, login } from "../controllers/auth.js";
import { authValidator, googleValidator } from "../validators/auth.js";

export const router = Router();

router.post("/", authValidator, login);
router.post("/google", googleValidator, googleSignIn);

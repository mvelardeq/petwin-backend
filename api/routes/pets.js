import { Router } from "express";

export const router = Router();

router.get("/", (req, res, next) => {
  res.send("Hello pets");
});
router.post("/", (req, res, next) => {
  res.send("Hello post pets");
});

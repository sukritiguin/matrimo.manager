import express from "express";
import { ApiResponse } from "@matrimo/lib";

const router: express.Router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(new ApiResponse(true, "I am healthy and tasty"));
});

export default router;

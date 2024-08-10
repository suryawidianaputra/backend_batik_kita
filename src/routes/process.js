import express from "express";
import { auth } from "../middleware/authentication.js";
import {
  createProcess,
  deleteProcess,
  getProcessByAccountId,
  updateProcess,
} from "../controllers/process.js";

const router = express.Router();

router.get("/process/:account_id", [auth], getProcessByAccountId);
router.post("/process", [auth], createProcess);
router.patch("/process/:id", [auth], updateProcess);
router.delete("/process/:id", [auth], deleteProcess);

export default router;

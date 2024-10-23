import express from "express";
import { auth } from "../middleware/authentication.js";
import {
  createProcess,
  getAllProcess,
  deleteProcess,
  getProcessByEmail,
  updateProcess,
  getProcessByProcessId,
} from "../controllers/process.js";

const router = express.Router();

router.get("/process/:email", [auth], getProcessByEmail);
router.get("/process/:id", [auth], getProcessByProcessId);
router.get("/process", [auth], getAllProcess);
router.post("/process", [auth], createProcess);
router.patch("/process/:id", [auth], updateProcess);
router.delete("/process/:id", [auth], deleteProcess);

export default router;

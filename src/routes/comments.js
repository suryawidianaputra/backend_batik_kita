// import express from "express";
import express from "express";
import { auth } from "../middleware/authentication.js";
import {
  getCommentByProductId,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comments.js";

const router = express.Router();
router.get("/comment/:product_id", [auth], getCommentByProductId);
router.post("/comment", [auth], createComment);
router.patch("/comment/:id", [auth], updateComment);
router.delete("/comment/:id", [auth], deleteComment);

export default router;

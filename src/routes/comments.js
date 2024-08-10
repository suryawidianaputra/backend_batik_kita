import express from "express";
import { auth } from "../middleware/authentication.js";
import {
  getCommentByProductId,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comments.js";

const route = express.Router();

route.get("/comment/:product_id", [auth], getCommentByProductId);
route.post("/comment", [auth], createComment);
route.patch("/comment/:id", [auth], updateComment);
route.delete("/comment/:id", [auth], deleteComment);

export default route;

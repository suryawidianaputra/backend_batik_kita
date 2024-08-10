import express from "express";
import { auth } from "../middleware/authentication.js";
import {
  getCartByAccountId,
  getAllCart,
  createCart,
  deleteCart,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/cart/:account_id", [auth], getCartByAccountId);
router.get("/cart", getAllCart);
router.post("/cart", [auth], createCart);
router.delete("/cart/:id", [auth], deleteCart);

export default router;

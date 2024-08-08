import express from "express";
import { auth } from "../middleware/authentication";
import {
  getCartByAccountId,
  getAllCart,
  createCart,
  deleteCart,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/cart/:id", [auth], getCartByAccountId);
router.get("/cart", [auth], getAllCart);
router.post("cart", [auth], createCart);
router.delete("/cart", [auth], deleteCart);

export default router;

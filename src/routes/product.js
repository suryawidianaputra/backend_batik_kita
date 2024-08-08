import express from "express";
import { auth } from "../middleware/authentication.js";
import {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

const router = express();

router.get("/product", [auth], getProduct);
router.get("/product/:id", [auth], getProductById);
router.post("/product", [auth], createProduct);
router.patch("/product/:id", [auth], updateProduct);
router.delete("/product/:id", [auth], deleteProduct);

export default router;

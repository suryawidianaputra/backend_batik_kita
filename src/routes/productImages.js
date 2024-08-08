import express from "express";
import { auth } from "../middleware/authentication.js";
import { createProduct, getProductById } from "../controllers/productImages.js";

const router = express.Router();

router.get("/product_image/byId/:product_id", [auth], getProductById);
router.post("/product_image", [auth], createProduct);

export default router;

import express from "express";
import { auth } from "../middleware/authentication.js";
import {
  deleteFavorite,
  createFavorite,
  getFavoriteAccountId,
} from "../controllers/favorite.js";
const router = express.Router();

router.get("/favorite/:id", [auth], getFavoriteAccountId);
router.post("/favorite", [auth], createFavorite);
router.delete("/favorite/:id", [auth], deleteFavorite);

export default router;

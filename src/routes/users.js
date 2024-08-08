import express from "express";
import { auth } from "../middleware/authentication.js";
import {
  GET,
  POST,
  PATCH,
  DELETE,
  ADDRESS,
  PICTURE,
} from "../controllers/users.js";

const route = express.Router();

route.get("/users", [auth], GET);
route.post("/users", [auth], POST);
route.patch("/users/:id", [auth], PATCH);
route.delete("/users/:id", [auth], DELETE);
route.patch("/users/address/:id", [auth], ADDRESS);
route.patch("/users/pitcture/:id", [auth], PICTURE);

export default route;

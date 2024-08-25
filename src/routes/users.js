import express from "express";
import { auth } from "../middleware/authentication.js";
import {
  GET,
  POST,
  PATCH,
  DELETE,
  ADDRESS,
  PICTURE,
  GetAllUsers,
  getAccountByEmail,
} from "../controllers/users.js";

const route = express.Router();

route.post("/users/login", [auth], GET);
route.get("/users/profile/:email", [auth], getAccountByEmail);
route.post("/users", [auth], POST);
route.patch("/users/:id", [auth], PATCH);
route.delete("/users/:id", [auth], DELETE);
route.patch("/users/address/:id", [auth], ADDRESS);
route.patch("/users/picture/:id", [auth], PICTURE);
route.get("/users/all", [auth], GetAllUsers);

export default route;

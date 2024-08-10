import express from "express";
import cors from "cors";
import dot from "dotenv";
import multer from "multer";
import path from "path";

// import file
import { corsConfiguration } from "./configuration/cors.js";
import { fileStorage, fileFilter } from "./middleware/multer.js";
import userRoute from "./routes/users.js";
import productRoute from "./routes/product.js";
import productImageRoute from "./routes/productImages.js";
import cartRoute from "./routes/cart.js";
import processRoute from "./routes/process.js";
import favoriteRoute from "./routes/favorite.js";

// configuration
dot.config();
const app = express();
app.use(express.json(), cors(corsConfiguration));
app.use(express.static("images"));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// routes
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", productImageRoute);
app.use("/api", cartRoute);
app.use("/api", processRoute);
app.use("/api", favoriteRoute);

app.listen(process.env.PORT, () =>
  console.log(`server up and running on PORT: ${process.env.PORT}`)
);

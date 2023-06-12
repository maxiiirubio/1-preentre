import express from "express";
import { PORT } from "./config.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server Ok" });
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

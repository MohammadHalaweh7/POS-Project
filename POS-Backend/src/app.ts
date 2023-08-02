import express from "express";
import productsRouter from "./routes/products.js";
import productCategoriesRouter from "./routes/productCategories.js";
import unitOfMeasureRouter from "./routes/unitOfMeasure.js";
import sequelize from "../database.js";
import { seedDatabase } from "../seed.js";
import checkoutRouter from "./routes/checkout.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/users.js";
import { User } from "./model/userModel.js";
import cors from "cors"
const app = express();
const port = 5050;

// app.use(cors({ origin: "http://localhost:3000", credentials: true, optionsSuccessStatus: 200 }));

app.use(cors({ origin: "*" }))

app.use(express.json());

sequelize.sync().then(() => seedDatabase());
app.use("/", authRouter);
app.use("/products", productsRouter);
app.use("/product-categories", productCategoriesRouter);
app.use("/unit-of-measure", unitOfMeasureRouter);
app.use("/checkout", checkoutRouter);
//for development purpose
app.use("/users", userRouter);

// Start the server
app.listen(port, () => {
  console.log("Server is running on port 5050");
});

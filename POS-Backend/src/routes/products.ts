import { Router, Request, Response } from "express";
import { Product, ProductCreationAttributes } from "../model/productModel";
import { authenticateToken } from "../auth/auth";

const productsRouter = Router();

//Retrive all products
productsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    setTimeout(() => {
      res.json(products);
      console.log("Products have been Retrived");
    }, 100);
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: "Server Error" });
    }, 100);
  }
});

//Bring a specific product based on product id
productsRouter.get("/:productId", async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      setTimeout(() => {
        res.json(product);
        console.log("Single product have been Retrived");
      }, 100);
    } else {
      setTimeout(() => {
        res.status(404).json({ error: "Product not found" });
      }, 100);
    }
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: "Server Error" });
    }, 100);
  }
});

//Post a new product
productsRouter.post("/", async (req: Request, res: Response) => {
  const {
    name,
    code,
    quantity,
    image,
    price,
    categoryId,
    unitId,
  }: ProductCreationAttributes = req.body;
  if (
    typeof name !== "string" ||
    typeof code !== "string" ||
    typeof quantity !== "number" ||
    (image !== undefined && typeof image !== "string") ||
    typeof price !== "number" ||
    typeof categoryId !== "number" ||
    typeof unitId !== "number"
  ) {
    setTimeout(() => {
      return res.status(400).json({ error: "Invalid data types" });
    }, 100);
  }
  try {
    const product = await Product.create({
      name,
      code,
      quantity,
      image,
      price,
      categoryId,
      unitId,
    });
    setTimeout(() => {
      res.status(201).json(product);
      console.log("The product has been added successfully");
    }, 100);
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: "Server Error" });
    }, 100);
  }
});

//Update a specific product based on product id
productsRouter.put("/:productId", async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const {
    name,
    code,
    quantity,
    image,
    price,
    categoryId,
    unitId,
  }: ProductCreationAttributes = req.body;
  if (
    typeof name !== "string" ||
    typeof code !== "string" ||
    typeof quantity !== "number" ||
    (image !== undefined && typeof image !== "string") ||
    typeof price !== "number" ||
    typeof categoryId !== "number" ||
    typeof unitId !== "number"
  ) {
    setTimeout(() => {
      return res.status(400).json({ error: "Invalid data types" });
    }, 100);
  }
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.update({
        name,
        code,
        quantity,
        image,
        price,
        categoryId,
        unitId,
      });
      setTimeout(() => {
        res.json(product);
        console.log("The product has been updated successfully");
      }, 100);
    } else {
      setTimeout(() => {
        res.status(404).json({ error: "Product not found" });
      }, 100);
    }
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: "Server Error" });
    }, 100);
  }
});

//Delete a specific product based on product id
productsRouter.delete("/:productId", async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.destroy();
      setTimeout(() => {
        res.json({ message: "Product deleted successfully" });
      }, 100);
    } else {
      setTimeout(() => {
        res.status(404).json({ error: "Product not found" });
      }, 100);
    }
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: "Server Error" });
    }, 100);
  }
});

export default productsRouter;

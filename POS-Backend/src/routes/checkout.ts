import { Router, Request, Response } from "express";
import { authenticateToken } from "../auth/auth";
const checkoutRouter = Router();

checkoutRouter.post("/", authenticateToken,async (req: Request, res: Response) => {
  try {
    const { products, tax, discount } = req.body;

    if (
      !Array.isArray(products) ||
      typeof tax !== "number" ||
      typeof discount !== "number"
    ) {
      setTimeout(() => {
        return res.status(400).json({ error: "Invalid data types" });
      }, 100);
    }

    let totalPrice = 0;
    for (const product of products) {
      if (
        typeof product.name !== "string" ||
        typeof product.code !== "string" ||
        typeof product.quantity !== "number" ||
        typeof product.price !== "number"
      ) {
        return res.status(400).json({ error: "Invalid product data types" });
      }
      totalPrice += product.quantity * product.price;
    }

    const taxAmount = totalPrice * (tax / 100);
    const discountedPrice = totalPrice * (discount / 100);
    const totalPriceWithTax = totalPrice + taxAmount - discountedPrice;
    // const discountedPrice = totalPrice - totalPrice * discount;
    // const totalPriceWithTax = discountedPrice + discountedPrice * tax;
    setTimeout(() => {
      res.status(200).json({ totalPrice: totalPriceWithTax });
    }, 100);

    console.log("Checkout completed successfully");
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: "Server Error" });
    }, 100);
  }
});

export default checkoutRouter;

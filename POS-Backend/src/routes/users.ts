import { Router, Request, Response } from "express";
import { User } from "../model/userModel";
const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await User.findAll();
    res.json(products);
    console.log("users have been Retrived");
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

export default userRouter;

import { Router, Request, Response, NextFunction } from "express";
import { User } from "../model/userModel";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";

const authRouter = Router();
import dotenv from "dotenv";
import { generateAccessToken, generateRefreshToken } from "../auth/auth";
dotenv.config();

const userSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(30),
});

authRouter.post("/sign-up", async (req: Request, res: Response) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.send({ error: error.details });
    } else {
      const { email, userName } = req.body;
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        userName: userName,
        email: email,
        password: hashedPassword,
      });
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, existingUser.password)) {
      res.json({
        accessToken: generateAccessToken(existingUser)
      });
    } else {
      res.send("Password is incorrect");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});



export default authRouter;

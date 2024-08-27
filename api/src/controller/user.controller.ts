import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const signupSchema = z.object({
  username: z.string().min(5).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  try {
    const validation = signupSchema.safeParse({
      username,
      email,
      password,
    });
    if (!validation.success) {
      return next({
        status: 400,
        message: "Invalid Inputs",
        details: validation.error.errors,
      });
    }

    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    if (user) {
      return next({
        status: 400,
        message: "Account already exist.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(
      { user: newUser.username },
      process.env.JWT_SECRET as string
    );
    res.status(200).json({
      token,
      message: "Signed up.",
    });
  } catch (error: any) {
    next({
      status: 500,
      message: "Error while signing up.",
      details: error.message,
    });
  }
};

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const validation = signInSchema.safeParse({ email, password });
    if (!validation.success) {
      return next({ status: 401, message: "Invalid Inputs" });
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return next({
        status: 404,
        message: "Don't have an account. Create One",
      });
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      return next({
        status: 404,
        message: "Invalid creadentials.",
      });
    }
    const token = jwt.sign(
      { user: user.email },
      process.env.JWT_SECRET as string
    );
    res.status(200).json({
      token,
      message: "Logged In.",
    });
  } catch (error: any) {
    return next({
      status: 401,
      message: error.message,
    });
  }
};

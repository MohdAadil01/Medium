import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
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
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(200).json({
      user: userWithoutPassword,
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

const signinSchema = z.object({
  email: z.string().email(),
});

export const signin = async (req: Request, res: Response) => {
  res.send("signin");
};

import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  res.send("signup");
};

export const signin = async (req: Request, res: Response) => {
  res.send("signin");
};

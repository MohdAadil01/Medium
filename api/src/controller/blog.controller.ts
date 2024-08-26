import { Request, Response } from "express";

export const createBlog = (req: Request, res: Response) => {
  res.json({
    message: "blog",
  });
};

export const updateBlog = (req: Request, res: Response) => {
  res.json({
    message: "blog put",
  });
};

export const getBlog = (req: Request, res: Response) => {
  res.send("Hello Express: Responses!");
};
